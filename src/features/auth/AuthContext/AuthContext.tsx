import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export type UserData = {
  uid: string;
  name: string;
  email: string;
  phone: string;
  pincode: string;
  address: string;
  city: string;
  stateName: string;
  country: string;
  bankAccountNumber: string;
  accountHolderName: string;
  ifscCode: string;
  profileImage: string;
  createdAt: any;
  updatedAt: any;
};

type AuthContextType = {
  user: FirebaseAuthTypes.User | null;
  userData: UserData | null;
  initializing: boolean;
  updateUserData: (updates: Partial<UserData>) => Promise<{ success: boolean; error?: string }>;
  refreshUserData: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = auth().onAuthStateChanged(async (u) => {
      setUser(u);

      if (u) {
        // User logged in — Firestore se data fetch
        await fetchUserData(u.uid);
      } else {
        // Logged out — clear
        setUserData(null);
      }

      setInitializing(false);
    });
    return unsub;
  }, []);

  // -----------------------------------------
  // Firestore se user data fetch (UID se)
  // -----------------------------------------
  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await firestore().collection("users").doc(uid).get();

      if (userDoc.exists()) {
        setUserData({ uid, ...userDoc.data() } as UserData);
      } else {
        // Document nahi mila — default create kar do
        const currentUser = auth().currentUser;
        const defaultData: UserData = {
          uid,
          name: currentUser?.displayName || "",
          email: currentUser?.email || "",
          phone: "",
          pincode: "",
          address: "",
          city: "",
          stateName: "",
          country: "",
          bankAccountNumber: "",
          accountHolderName: "",
          ifscCode: "",
          profileImage: "",
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        };

        await firestore().collection("users").doc(uid).set(defaultData);
        setUserData(defaultData);
      }
    } catch (error: any) {
      console.log("Firestore fetch error:", error.message);
    }
  };

  // -----------------------------------------
  // Update: Firestore + local state dono
  // -----------------------------------------
  const updateUserData = async (updates: Partial<UserData>) => {
    try {
      const uid = auth().currentUser?.uid;
      if (!uid) return { success: false, error: "Not logged in" };

      await firestore()
        .collection("users")
        .doc(uid)
        .update({
          ...updates,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      setUserData((prev) => (prev ? { ...prev, ...updates } : null));

      if (updates.name) {
        await auth().currentUser?.updateProfile({
          displayName: updates.name,
        });
      }

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // -----------------------------------------
  // Manual refresh
  // -----------------------------------------
  const refreshUserData = async () => {
    const uid = auth().currentUser?.uid;
    if (uid) {
      await fetchUserData(uid);
    }
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      userData,
      initializing,
      updateUserData,
      refreshUserData,
      logout: async () => {
        await auth().signOut();
      },
    }),
    [user, userData, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};