import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Heading from "../components/Heading";
import TextBlock from "../components/TextBlock";
import ReusableButton from "../components/ReusableButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OTPVerification = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = [];

  const handleOtpChange = (value, index) => {
    const otpArray = [...otp];
    otpArray[index] = value;
    setOtp(otpArray);

    if (value && index < otp.length - 1) {
      const nextInput = index + 1;
      otpRefs[nextInput]?.focus();
    }
  };

  const handleContinue = async () => {
    const enteredOtp = otp.join(""); // Combine the OTP array into a single string
  
    if (enteredOtp.length < 6) {
      Alert.alert("Error", "Please enter a valid 6-digit OTP.");
      return;
    }
  
    try {
      const signupData = JSON.parse(await AsyncStorage.getItem("signupData"));
  
      if (signupData?.email === email && signupData?.otp === enteredOtp) {
        Alert.alert("Success", "OTP verified successfully!");
        navigation.navigate("CreatePassword", { email }); // Proceed to the next step
      } else {
        Alert.alert("Error", "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("Error", "Failed to verify OTP. Please try again.");
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
        <Heading navigation={navigation} heading="OTP Verification" />
        <TextBlock text="Please enter your verification code sent to your email account." />
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              keyboardType="number-pad"
              maxLength={1}
              ref={(ref) => (otpRefs[index] = ref)}
            />
          ))}
        </View>
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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFFFFF80",
    backgroundColor: "#FFFFFF1A",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
  },
});

export default OTPVerification;
