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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const Thoughts = ({ navigation }) => {
  const [text, setText] = useState("");
  const [thoughts, setThoughts] = useState([]); // Store thoughts, not answers
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    // Load saved thoughts from AsyncStorage when the component mounts
    const loadThoughts = async () => {
      try {
        const storedThoughts = await AsyncStorage.getItem("thoughts");
        if (storedThoughts) {
          setThoughts(JSON.parse(storedThoughts));
        }
      } catch (error) {
        console.error("Failed to load thoughts from AsyncStorage", error);
      }
    };

    loadThoughts();
  }, []);

  useEffect(() => {
    // Save thoughts to AsyncStorage whenever the thoughts array changes
    const saveThoughts = async () => {
      try {
        await AsyncStorage.setItem("thoughts", JSON.stringify(thoughts));
      } catch (error) {
        console.error("Failed to save thoughts to AsyncStorage", error);
      }
    };

    saveThoughts();
  }, [thoughts]);

  const addThought = () => {
    if (text.trim()) {
      const newThoughts = [...thoughts, text.trim()]; // Add to thoughts, not answers
      setThoughts(newThoughts);
      setText("");
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <LinearGradient colors={["#5885AF", "#5885AF"]} style={styles.background}>
      <Header onBack={() => navigation.goBack()} title="Thoughts" />
      <View style={styles.container}>
        {/* List of Submitted Thoughts */}
        <FlatList
          data={thoughts}
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
                    <TouchableOpacity>
                      <MaterialCommunityIcons
                        name="speaker"
                        size={20}
                        color="#FFF"
                      />
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
            placeholder="Enter your text..."
            placeholderTextColor="#FFFFFF80"
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity onPress={addThought} style={styles.sendButton}>
            <Ionicons name="paper-plane" size={24} color="#41729F" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const Header = ({ onBack, title }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.backButton} onPress={onBack}>
      <Ionicons name="arrow-back" size={24} color="#616161" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

export default Thoughts;

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
    color: "#FFFFFF1A",
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
    paddingVertical: 0, // Adjusts alignment
  },
  sendButton: {
    marginLeft: 10,
    justifyContent: "center", // Centers the icon vertically
  },
});
