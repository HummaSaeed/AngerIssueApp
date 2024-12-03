import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Heading from "../components/Heading";
import TextBlock from "../components/TextBlock";
import ReusableButton from "../components/ReusableButton";
import InputField from "../components/InputField";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreatePassword = ({ navigation, route }) => {
  const { email } = route.params; // Get email passed from OTPVerification
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleContinue = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Both password fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      // Simulate saving the password for the email
      const signupData = { email, password };
      await AsyncStorage.setItem("userData", JSON.stringify(signupData));

      Alert.alert("Success", "Password created successfully!");
      navigation.navigate("SignIn"); // Navigate to the SignIn screen
    } catch (error) {
      console.error("Error saving password:", error);
      Alert.alert("Error", "Failed to save password. Please try again.");
    }
  };

  return (
    <LinearGradient
    colors={["#5885AF", "#5885AF"]}
      style={styles.background}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#616161" />
        </TouchableOpacity>
        <Heading navigation={navigation} heading="Create Password" />
        <TextBlock text={`Creating a password for ${email}`} />
        <InputField
          label="Password"
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <InputField
          label="Confirm Password"
          placeholder="Confirm your password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <ReusableButton text="Continue" onPress={handleContinue} />
        <View style={{ flex: 1 }}></View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    justifyContent: "flex-end",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
});

export default CreatePassword;
