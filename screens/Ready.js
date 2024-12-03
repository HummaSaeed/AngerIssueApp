import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
 Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ReadyImage from "../assets/ready.png"

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReusableButton from "../components/ReusableButton"

const Ready = ({navigation}) => {
  return (
    <LinearGradient colors={["#5885AF", "#5885AF"]} style={styles.background}>
      <Header onBack={() => navigation.goBack()} title="SOS" />
      <View style={styles.container}>
      <Image
          source={ReadyImage} // Replace with your image URL
          
        />
      <View style={{ width: "90%", position:"absolute",bottom:30}}>
              <ReusableButton text={"Continue"} onPress={()=>navigation.navigate("SOSMedication")}/>
            </View>
          </View>
          </LinearGradient>
  )
}
const Header = ({ onBack, title }) => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={24} color="#616161" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );

export default Ready

const styles = StyleSheet.create({
    background: {
        flex: 1,
      },
      container: {
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
      },
      backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 40,
      },
      headerTitle: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        textAlign: "center",
      },
})