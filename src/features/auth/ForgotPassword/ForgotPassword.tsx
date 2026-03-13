import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import AppInput from "../../../components/AppInput";
import AppButton from "../../../components/AppButton";
import auth from "@react-native-firebase/auth";

const ForgotPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const submit = async () => {
    if (isSubmitLoading) return;

    const cleanEmail = email.trim();

    let valid = true;

    if (!cleanEmail) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      setEmailError("Invalid email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!valid) return;

    try {
      setIsSubmitLoading(true);
      setFormMsg("");

      // ✅ Registered email par reset mail send hogi
      await auth().sendPasswordResetEmail(cleanEmail);

      setFormMsg("Password reset link sent to your email.");
      // optional: login page pe bhejna ho to uncomment kar do
      // navigation.navigate("Login");
    } catch (e: any) {
      // Simple + clear messages
      if (e?.code === "auth/user-not-found") {
        setFormMsg("This email is not registered.");
      } else if (e?.code === "auth/invalid-email") {
        setEmailError("Invalid email");
      } else if (e?.code === "auth/too-many-requests") {
        setFormMsg("Too many attempts. Please try again later.");
      } else if (e?.code === "auth/network-request-failed") {
        setFormMsg("Network error. Please check your internet.");
      } else {
        setFormMsg("Could not send reset email. Try again later.");
      }
    } finally {
      setIsSubmitLoading(false);
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
          <View style={{ marginBottom: "95%" }}>
            <Text style={styles.heading}>Forgot password?</Text>

            <AppInput
              placeholder="Email"
              icon="email"
              iconType="material"
              value={email}
              keyboardType="email-address"
              inputMode="email"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="done"
              onSubmitEditing={submit}
              onChangeText={(t: string) => {
                setEmail(t);
                if (emailError) setEmailError("");
                if (formMsg) setFormMsg("");
              }}
              error={emailError}
            />

            <View style={{ flexDirection: "row", marginTop: 8 }}>
              <Text style={{ color: "#FF4B26" }}>*</Text>
              <Text style={styles.description}>
                {" "}
                We will send you a link to reset your password
              </Text>
            </View>

            <AppButton
              title="Submit"
              loading={isSubmitLoading}
              loadingText="Sending..."
              onPress={submit}
              buttonStyle={{ marginTop: 18 }}
            />

            {!!formMsg && <Text style={styles.formMsg}>{formMsg}</Text>}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingBottom: 30,
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#000",
    width: 185,
    height: 90,
    fontFamily: "Monserrat",
  },
  description: {
    fontSize: 14,
    color: "#7C7C7C",
    marginBottom: 20,
    fontWeight: "400",
  },
  formMsg: {
    marginTop: 12,
    fontSize: 12,
    color: "#575757",
    textAlign: "center",
    fontWeight: "600",
  },
});