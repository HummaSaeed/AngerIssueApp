import React from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeTab from "./HomeTab";
import SettingsTab from "./SettingsTab";
import ProfileTab from "./ProfileTab";
import Center from "../assets/centeredIcon.png"
import IceBerg from "./IceBerg";
import Knowledge from "./Knowledge";
import Feelings from "./Feelings";

// Placeholder components for tabs

const QuoteTab = () => (
  <View style={styles.centered}>
    <Text>Quote Tab</Text>
  </View>
);


const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.customButton}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Quote") {
            iconName = "document-text-outline";
          } else if (route.name === "Iceberg") {
            iconName = "color-filter-sharp";
          } else if (route.name === "ProfileTab") {
            iconName = "person-outline";
          }

          return <Ionicons name={iconName} size={26} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#1E1E1E", // Match background color
          height: 70,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false, // Hide labels
      })}
    >
      <Tab.Screen name="Home" component={HomeTab} options={{ headerShown: false }} />
      <Tab.Screen name="Quote" component={Feelings} options={{ headerShown: false }} />
      <Tab.Screen
        name="Central"
        component={HomeTab}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
              <Image source={Center} size={50}  />
            </CustomTabBarButton>
          ),
        }}
      />
      <Tab.Screen name="Iceberg" component={IceBerg} options={{ headerShown: false }} />
      <Tab.Screen name="ProfileTab" component={ProfileTab} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
     // Same as SignIn screen
  },
  customButton: {
    top: -30, // Lift the central button
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
