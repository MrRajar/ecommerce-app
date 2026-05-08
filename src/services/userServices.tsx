import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type UserProfileUpdates = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
};

export const registerUser = async (
  email: string,
  password: string,
  name: string,
) => {
  try {
    // 1. Firebase Auth mein account create
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );

    const uid = userCredential.user.uid;

    // 2. Auth profile mein name set
    await userCredential.user.updateProfile({
      displayName: name,
    });

    // 3. Firestore 'users' collection mein document create
    //    doc(uid) ← YEHI CONNECTION HAI Auth aur Firestore ka
    await firestore().collection('users').doc(uid).set({
      name: name,
      email: email,
      phone: '',
      address: '',
      profileImage: '',
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });

    return {success: true, uid};
  } catch (error: any) {
    return {success: false, error: getErrorMessage(error.code)};
  }
};

// -----------------------------------------
// LOGIN
// -----------------------------------------
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    return {success: true, uid: userCredential.user.uid};
  } catch (error: any) {
    return {success: false, error: getErrorMessage(error.code)};
  }
};

// -----------------------------------------
// GET PROFILE — UID se Firestore se data lao
// -----------------------------------------
export const getUserProfile = async (uid?: string) => {
  try {
    if (!uid) {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        return {success: false, error: 'User logged in nahi hai'};
      }
      uid = currentUser.uid;
    }

    const userDoc = await firestore().collection('users').doc(uid).get();

    if (userDoc.exists()) {
      return {success: true, data: {uid, ...userDoc.data()}};
    } else {
      return {success: false, error: 'Profile document nahi mila'};
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return {success: false, error: errorMessage};
  }
};

export const updateUserProfile = async (updates: UserProfileUpdates) => {
  try {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      return {success: false, error: 'User logged in nahi hai'};
    }

    const uid = currentUser.uid;

    // Firestore update
    await firestore()
      .collection('users')
      .doc(uid)
      .update({
        ...updates,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

    // Agar name change hua to Auth bhi sync karo
    if (updates.name) {
      await currentUser.updateProfile({
        displayName: updates.name,
      });
    }

    return {success: true};
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return {success: false, error: errorMessage};
  }
};


export const logoutUser = async () => {
  try {
    await auth().signOut();
    return {success: true};
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return {success: false, error: errorMessage};
  }
};


const getErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Ye email pehle se registered hai';
    case 'auth/invalid-email':
      return 'Email format sahi nahi hai';
    case 'auth/weak-password':
      return 'Password kamzor hai, minimum 6 characters';
    case 'auth/user-not-found':
      return 'Ye email registered nahi hai';
    case 'auth/wrong-password':
      return 'Password galat hai';
    case 'auth/too-many-requests':
      return 'Bohat zyada attempts, thodi der baad try karo';
    case 'auth/network-request-failed':
      return 'Internet connection check karo';
    default:
      return 'Kuch galat ho gaya, dobara try karo';
  }
};