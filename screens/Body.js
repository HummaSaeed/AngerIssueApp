import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const Body = ({navigation}) => {
    const [text, setText] = useState("");
    const [body, setBody] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
  
    useEffect(() => {
     
      const loadBody = async () => {
        try {
          const storedBody = await AsyncStorage.getItem("Body");
          if (storedBody) {
            setBody(JSON.parse(storedBody));
          }
        } catch (error) {
          console.error("Failed to load body from AsyncStorage:", error);
        }
      };
  
      loadBody();
    }, []);
  
    const addBody = async () => {
      if (text.trim()) {
        const newBody = [...body, text.trim()];
        setBody(newBody);
        setText(""); // Clear input field
  
        try {
          
          await AsyncStorage.setItem("Body", JSON.stringify(newBody));
        } catch (error) {
          console.error("Failed to save body to AsyncStorage:", error);
        }
      }
    };
  
    const handleSpeak = (text) => {
      Speech.speak(text, { language: "en-US" });
    };
  
    const toggleExpand = (index) => {
      setExpandedIndex(index === expandedIndex ? null : index);
    };
  return (
    <LinearGradient colors={["#5885AF", "#5885AF"]} style={styles.background}>
      <Header onBack={() => navigation.goBack()} title="Body" />
      <View style={styles.container}>
        
        <FlatList
          data={body}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <>
              {/* List Item */}
              <View style={styles.listItem}>
                <View style={styles.itemContent}>
                  <View style={styles.itemNumber}>
                    <Text style={styles.itemNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.itemText}>{item}</Text>
                  <TouchableOpacity onPress={() => toggleExpand(index)}>
                    <Ionicons
                      name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                      size={24}
                      color="#FFF"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Expanded Content */}
              {expandedIndex === index && (
                <View style={styles.expandedContainer}>
                  <Text style={styles.expandedText}>{item}</Text>
                  <View style={styles.helpfulSection}>
                    <View style={styles.likeDislike}>
                      <TouchableOpacity>
                        <Ionicons name="thumbs-up" size={20} color="#FFF" />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Ionicons name="thumbs-down" size={20} color="#FFF" />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.speakerIcon}
                      onPress={() => handleSpeak(item)} // Use item here for speech
                    >
                      <Ionicons name="volume-high" size={24} color="#41729F" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </>
          )}
        />

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter body..."
            placeholderTextColor="#FFFFFF80"
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity onPress={addBody} style={styles.sendButton}>
            <Ionicons name="paper-plane" size={24} color="#41729F" />
          </TouchableOpacity>
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

export default Body

const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
      flex: 1,
      paddingVertical: 30,
      paddingHorizontal: 16,
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
    listItem: {
      backgroundColor: "#41729F",
      borderRadius: 50,
      padding: 8,
      marginBottom: 5,
    },
    itemContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    itemNumber: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#FFF",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 8,
    },
    itemNumberText: {
      color: "#FFF",
      fontSize: 14,
    },
    itemText: {
      flex: 1,
      color: "#FFF",
      fontSize: 16,
    },
    expandedContainer: {
      marginTop: 8,
      backgroundColor: "#FFFFFF1A",
      borderRadius: 10,
      padding: 10,
      marginBottom:10
    },
    expandedText: {
      color: "#FFF",
      fontSize: 14,
      marginBottom: 10,
    },
    helpfulSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    likeDislike: {
      flexDirection: "row",
      gap: 10,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#FFFFFF1A",
      padding: 12,
      borderRadius: 10,
      position: "absolute",
      bottom: 20,
      left: 16,
      right: 16,
    },
    input: {
      flex: 1,
      color: "#FFF",
      fontSize: 16,
      paddingVertical: 0,
    },
    sendButton: {
      marginLeft: 10,
      justifyContent: "center",
    },
  });