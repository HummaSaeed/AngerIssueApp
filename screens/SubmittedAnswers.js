import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SubmittedAnswers = ({ navigation }) => {
  const [text, setText] = useState("");
  const [answers, setAnswers] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Load saved answers from AsyncStorage when component mounts
  useEffect(() => {
    const loadAnswers = async () => {
      try {
        const storedAnswers = await AsyncStorage.getItem("submittedAnswers");
        if (storedAnswers) {
          setAnswers(JSON.parse(storedAnswers));
        }
      } catch (error) {
        console.error("Error loading answers:", error);
      }
    };
    loadAnswers();
  }, []);

  // Save new answers to AsyncStorage
  const saveAnswers = async (newAnswers) => {
    try {
      await AsyncStorage.setItem("submittedAnswers", JSON.stringify(newAnswers));
    } catch (error) {
      console.error("Error saving answers:", error);
    }
  };

  const addAnswer = () => {
    if (text.trim()) {
      const newAnswers = [...answers, text.trim()];
      setAnswers(newAnswers);
      setText("");
      saveAnswers(newAnswers); // Save the updated answers
    } else {
      Alert.alert("Error", "Please enter some text.");
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <LinearGradient colors={["#5885AF", "#5885AF"]} style={styles.background}>
      <Header onBack={() => navigation.goBack()} title="My Iceberg" />
      <View style={styles.container}>
        {/* List of Submitted Answers */}
        <FlatList
          data={answers}
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
            placeholder="Enter your text..."
            placeholderTextColor="#FFFFFF80"
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity onPress={addAnswer} style={styles.sendButton}>
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

export default SubmittedAnswers;

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
    bottom: 30,
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
