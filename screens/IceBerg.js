import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import BgImage from "../assets/Iceberg.png";
import ReusableButton from "../components/ReusableButton";
import Top from "../assets/Top.png";
import Thoughts from "../assets/Thoughts.png";
import Body from "../assets/Body.png";
import Feelings from "../assets/feelings.png"
import Need from "../assets/Need.png";

const { width } = Dimensions.get("window");

const Iceberg = ({ navigation }) => {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);

  const screens = [
    {
      key: "Iceberg",
      content: (
        <View style={styles.screenContainer}>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <TouchableOpacity>
            <Image source={Top} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Thoughts")}>
            <Image source={Thoughts} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Body")}>
            <Image source={Body} />
            </TouchableOpacity>
            <TouchableOpacity>
            <Image source={Feelings} onPress={() => navigation.navigate("Feelings")}/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Image source={Need} />
            </TouchableOpacity>
          </View>
          <View style={{ width: "90%", marginTop: 40 }}>
            <ReusableButton
              text={"Submitted Answers"}
              onPress={() => navigation.navigate("SubmittedAnswers")}
            />
          </View>
        </View>
      ),
    },
    {
      key: "knowledge",
      content: (
        <View style={styles.screenContainer}>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <TouchableOpacity>
            <Image source={Top} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Thoughts")}>
            <Image source={Thoughts} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Body")}>
            <Image source={Body} />
            </TouchableOpacity>
            <TouchableOpacity>
            <Image source={Feelings} onPress={() => navigation.navigate("Feelings")}/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Image source={Need} onPress={() => navigation.navigate("Need")}/>
            </TouchableOpacity>
          </View>
          <View style={{ width: "90%", marginTop: 40 }}>
            <ReusableButton
              text={"Knowledge"}
              onPress={() => navigation.navigate("Knowledge")}
            />
          </View>
        </View>
      ),
    },
    {
      key: "SOS",
      content: (
        <View style={styles.screenContainer}>
 <View style={{ display: "flex", flexDirection: "column" }}>
            <TouchableOpacity>
            <Image source={Top} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Thoughts")}>
            <Image source={Thoughts} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Body")}>
            <Image source={Body} />
            </TouchableOpacity>
            <TouchableOpacity>
            <Image source={Feelings} onPress={() => navigation.navigate("Feelings")}/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Image source={Need} />
            </TouchableOpacity>
          </View>
          <View style={{ width: "90%", marginTop: 40 }}>
            <ReusableButton
              text={"SOS"}
              onPress={() => navigation.navigate("SOS")}
            />
          </View>
        </View>
      ),
    },
    {
      key: "Thoughts",
      content: (
        <View style={styles.screenContainer}>
           <View style={{ display: "flex", flexDirection: "column" }}>
            <TouchableOpacity>
            <Image source={Top} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Thoughts")}>
            <Image source={Thoughts} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Body")}>
            <Image source={Body} />
            </TouchableOpacity>
            <TouchableOpacity>
            <Image source={Feelings} onPress={() => navigation.navigate("Feelings")}/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Image source={Need} />
            </TouchableOpacity>
          </View>
          <View style={{ width: "90%", marginTop: 40 }}>
            <ReusableButton
              text={"Thoughts"}
              onPress={() => navigation.navigate("Thoughts")}
            />
          </View>
        </View>
      ),
    },
  ];

  const navigate = (direction) => {
    const newIndex =
      (currentScreenIndex + direction + screens.length) % screens.length;
    setCurrentScreenIndex(newIndex);
  };

  return (
    <LinearGradient colors={["#5885AF", "#5885AF"]} style={styles.background}>
      <Header onBack={() => navigation.goBack()} title="My Iceberg" />
      <View style={styles.container}>
        {/* Render the current screen */}
        {screens[currentScreenIndex].content}

        {/* Navigation Icons */}
        <TouchableOpacity
          style={[styles.navIcon, styles.leftIcon]}
          onPress={() => navigate(-1)}
        >
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navIcon, styles.rightIcon]}
          onPress={() => navigate(1)}
        >
          <Icon name="arrow-right" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default Iceberg;

const Header = ({ onBack, title }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.backButton} onPress={onBack}>
      <Ionicons name="arrow-back" size={24} color="#616161" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
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
  container: {
    flex: 1,
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
  icebergImage: {
    width: width * 0.8,
    height: width * 1,
    resizeMode: "contain",
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  screenText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  navIcon: {
    position: "absolute",
    top: "50%",
    zIndex: 10,
    backgroundColor: "#00000080",
    padding: 10,
    borderRadius: 30,
  },
  leftIcon: {
    left: 20,
  },
  rightIcon: {
    right: 20,
  },
});
