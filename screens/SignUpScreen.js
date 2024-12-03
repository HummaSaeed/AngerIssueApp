import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Heading from "../components/Heading";
import TextBlock from "../components/TextBlock";
import ReusableButton from "../components/ReusableButton";
import InputField from "../components/InputField";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleInputChange = (field, value) => {
    console.log(`Field: ${field}, Value: ${value}`); // Debug log
    setFormData({ ...formData, [field]: value });
  };

  const handleNext = async () => {
    console.log("Form Data at submission:", formData); // Debug log
    const { firstName, lastName, email } = formData;
  
    if (!firstName || !lastName || !email) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
  
    try {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
      console.log("Generated OTP:", generatedOtp); // Debug log
      await AsyncStorage.setItem(
        "signupData",
        JSON.stringify({ ...formData, otp: generatedOtp })
      );
      Alert.alert("OTP Sent", `Your OTP is ${generatedOtp}`);
      navigation.navigate("OTPVerification", { email });
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "Failed to save data. Please try again.");
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#616161" />
        </TouchableOpacity>
        <Heading
          navigation={navigation}
          heading="Enter your Personal Information"
        />
        <TextBlock text="Please enter your valid information for account creation." />
        <InputField
          label="First Name"
          placeholder="Enter your First Name"
          value={formData.firstName}
          onChangeText={(value) => handleInputChange("firstName", value)}
        />
        <InputField
          label="Last Name"
          placeholder="Enter your Last Name"
          value={formData.lastName}
          onChangeText={(value) => handleInputChange("lastName", value)}
        />
        <InputField
          label="Email"
          placeholder="Enter your Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />
        <ReusableButton text="Next" onPress={handleNext} />
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.signupText}>
            Already have an account?{" "}
            <Text style={styles.signupLink}>Sign In</Text>
          </Text>
        </TouchableOpacity>
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
    paddingVertical: 30,
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
  signupText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 40,
  },
  signupLink: {
    color: "#41729F",
    fontWeight: "600",
  },
});

export default SignUpScreen;
