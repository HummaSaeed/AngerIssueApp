import React from "react";
import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";
import ReusableButton from "../components/ReusableButton";
import Heading from "../components/Heading";

const SplashScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <Image source={require("../assets/SplashIcon.png")} style={styles.icon} />
      <Heading navigation={navigation} heading="Welcome to AngerManager" />
      <Text style={styles.para}>Lorem Ipsum Dolor. </Text>
      <View style={styles.buttonContainer}>
        <ReusableButton
          text="Get Started"
          onPress={() => navigation.navigate("SignIn")}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.92)", // Overlay with opacity
  },
  icon: {
    width: 80, // Adjust size as needed
    height: 80,
    alignSelf: "left",
    marginBottom: 20,
  },
  para: {
    color: "white",
    marginTop: 10,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignSelf: "center",
  },
});

export default SplashScreen;
