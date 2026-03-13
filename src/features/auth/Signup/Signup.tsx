import React, { useState } from "react";
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

const Signup = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  // ✅ loading state
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const validateAndSignup = async () => {
    if (isSignupLoading) return; // duplicate tap block

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
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!confirm) {
      setConfirmError("Confirm password is required");
      valid = false;
    } else if (confirm !== password) {
      setConfirmError("Confirm password does not match");
      valid = false;
    } else {
      setConfirmError("");
    }

    if (!valid) return;

    try {
      setIsSignupLoading(true);

      await auth().createUserWithEmailAndPassword(email.trim(), password);

      navigation.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    } catch (e: any) {
      const code = e?.code;

      if (code === "auth/email-already-in-use") setEmailError("Email already in use");
      else if (code === "auth/invalid-email") setEmailError("Invalid email");
      else if (code === "auth/weak-password") setPasswordError("Weak password (min 6 characters)");
      else Alert.alert("Signup failed", e?.message ?? "Something went wrong");
    } finally {
      setIsSignupLoading(false);
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
          <Text style={styles.heading}>Create an account</Text>

          <AppInput
            placeholder="Username or Email"
            icon="person"
            iconType="material"
            value={email}
            keyboardType="email-address"
            inputMode="email"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            textContentType="emailAddress"
            returnKeyType="next"
            onChangeText={(t: string) => {
              setEmail(t);
              if (emailError) setEmailError("");
            }}
            error={emailError}
          />

          <View style={{ marginTop: "4%" }}>
            <AppInput
              placeholder="Password"
              icon="lock"
              iconType="material"
              secureTextEntry
              value={password}
              inputMode="text"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="current-password"
              textContentType="password"
              returnKeyType="done"
              onChangeText={(t: string) => {
                setPassword(t);
                if (passwordError) setPasswordError("");

                // ✅ confirm already typed ho to realtime re-check
                if (confirm) {
                  if (t !== confirm) {
                    setConfirmError("Confirm password does not match");
                  } else {
                    setConfirmError("");
                  }
                }
              }}
              error={passwordError}
            />
          </View>

          <View style={{ marginTop: "4%" }}>
            <AppInput
              placeholder="Confirm Password"
              icon="lock"
              iconType="material"
              secureTextEntry
              value={confirm}
              inputMode="text"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="current-password"
              textContentType="password"
              returnKeyType="done"
              onChangeText={(t: string) => {
                setConfirm(t);

                if (!t) {
                  if (confirmError) setConfirmError("");
                  return;
                }

                if (password && t !== password) {
                  setConfirmError("Confirm password does not match");
                } else {
                  setConfirmError("");
                }
              }}
              error={confirmError}
            />
          </View>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By clicking the <Text style={styles.termsLink}>Register</Text> button, you agree to the public offer
            </Text>
          </View>

          <AppButton
            title="Create Account"
            loading={isSignupLoading}
            loadingText="Creating Account..."
            onPress={validateAndSignup}
            buttonStyle={{ marginTop: "10%" }}
          />

          <Text style={styles.orText}>- OR Continue with -</Text>

          <View style={styles.socialRow}>
            <SocialButton type="google" />
            <SocialButton type="facebook" />
            <SocialButton type="apple" />
          </View>

          <View style={styles.bottomText}>
            <Text>I Already Have an Account </Text>
            <TouchableOpacity onPress={() => navigation.replace("Login")}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;

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
  orText: { textAlign: "center", marginVertical: 20, color: "#575757", fontSize: 14, marginTop: "20%" },
  socialRow: { flexDirection: "row", justifyContent: "center", gap: 15 },
  bottomText: { flexDirection: "row", justifyContent: "center", marginTop: 30 },
  link: { color: "#FF3B30", fontWeight: "600", textDecorationLine: "underline" },
  termsContainer: { width: 285, marginTop: "4%" },
  termsText: { fontSize: 13, color: "#999", fontFamily: "Montserrat-Regular", lineHeight: 20 },
  termsLink: { fontSize: 14, color: "#FF3B30", fontFamily: "Montserrat-Regular" },
});