import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import AppInput from "../../../components/AppInput";
import AppButton from "../../../components/AppButton";
import SocialButton from "../../../components/SocialButton";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";  // ← NEW
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "628932099560-taslka7vc9c14h54vfv7g9j3ktnhi8ot.apps.googleusercontent.com",
    });
  }, []);

  // -----------------------------------------
  // Helper: Google user ka Firestore document ensure karo
  // (agar pehle se hai to skip, nahi hai to create)
  // -----------------------------------------
  const ensureFirestoreUser = async (uid: string, userEmail: string, userName: string = "") => {
    try {
      const userDoc = await firestore().collection("users").doc(uid).get();
      if (userDoc.exists()) return; // already exists

      await firestore().collection("users").doc(uid).set({
        name: userName,
        email: userEmail,
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
      });
    } catch (error: any) {
      console.log("Firestore user creation error:", error.message);
    }
  };

  const validateAndLogin = async () => {
    if (isLoginLoading || isGoogleLoading) return;

    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Invalid email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    try {
      setIsLoginLoading(true);

      await auth().signInWithEmailAndPassword(email.trim(), password);

      // AuthContext auto detect karega → Firestore se data fetch hoga
      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    } catch (e: any) {
      const code = e?.code;

      if (code === "auth/user-not-found") Alert.alert("Login failed", "User not found");
      else if (code === "auth/wrong-password") Alert.alert("Login failed", "Wrong password");
      else if (code === "auth/invalid-email") Alert.alert("Login failed", "Invalid email");
      else Alert.alert("Login failed", e?.message ?? "Something went wrong");
    } finally {
      setIsLoginLoading(false);
    }
  };

  const onGoogleButtonPress = async () => {
    if (isGoogleLoading || isLoginLoading) return;

    try {
      setIsGoogleLoading(true);

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      await GoogleSignin.signOut();
      const signInResult: any = await GoogleSignin.signIn();

      const idToken = signInResult?.data?.idToken || signInResult?.idToken;

      if (!idToken) {
        Alert.alert("Google Login failed", "No ID token found");
        return;
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);

      // ✅ NEW: Google user ka Firestore document ensure karo
      await ensureFirestoreUser(
        userCredential.user.uid,
        userCredential.user.email || "",
        userCredential.user.displayName || "",
      );

      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    } catch (e: any) {
      if (e?.code === statusCodes.SIGN_IN_CANCELLED) return;

      if (e?.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Please wait", "Google sign-in already in progress");
        return;
      }

      if (e?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Google Play Services", "Play Services not available or outdated");
        return;
      }

      Alert.alert("Google Login failed", e?.message ?? "Something went wrong");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#fff" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          <StatusBar barStyle="dark-content" />

          <Text style={styles.heading}>Welcome Back!</Text>

          <AppInput
            placeholder="Username or Email"
            icon="person"
            iconType="material"
            value={email}
            importantForAutofill="yes"
            keyboardType="email-address"
            inputMode="email"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#999"
            textContentType="none"
            autoComplete="off"
            returnKeyType="next"
            onChangeText={(t: string) => {
              setEmail(t);
              if (emailError) setEmailError("");
            }}
            error={emailError}
          />

          <View style={{ marginTop: "5%", backgroundColor: "transparent" }}>
            <AppInput
              placeholder="Password"
              icon="lock"
              iconType="material"
              secureTextEntry
              value={password}
              inputMode="text"
              importantForAutofill="yes"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="none"
              autoComplete="off"
              returnKeyType="done"
              placeholderTextColor="#999"
              onChangeText={(t: string) => {
                setPassword(t);
                if (passwordError) setPasswordError("");
              }}
              error={passwordError}
            />
          </View>

          <TouchableOpacity
            style={styles.forgotContainer}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <AppButton
            title="Login"
            loading={isLoginLoading}
            loadingText="Logging in..."
            disabled={isGoogleLoading}
            onPress={validateAndLogin}
            buttonStyle={{ marginTop: "15%" }}
          />

          <Text style={styles.orText}>- OR Continue with -</Text>

          <View style={styles.socialRow}>
            <SocialButton
              type="google"
              onPress={isLoginLoading || isGoogleLoading ? undefined : onGoogleButtonPress}
            />
            <SocialButton type="apple" />
            <SocialButton type="facebook" />
          </View>

          <View style={styles.bottomText}>
            <Text>Create An Account </Text>
            <TouchableOpacity onPress={() => navigation.replace("Signup")}>
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 30,
    color: "#000",
    width: 185,
    height: 83,
    fontFamily: "Montserrat-ExtraBold.ttf",
  },
  forgotContainer: { alignItems: "flex-end" },
  forgotText: {
    fontSize: 13,
    color: "#FF3B30",
    fontFamily: "Montserrat-Regular.ttf",
    fontWeight: "500",
  },
  orText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#575757",
    fontSize: 14,
    marginTop: "20%",
  },
  socialRow: { flexDirection: "row", justifyContent: "center", gap: 15 },
  bottomText: { flexDirection: "row", justifyContent: "center", marginTop: 30 },
  link: { color: "#FF3B30", fontWeight: "600", textDecorationLine: "underline" },
});
