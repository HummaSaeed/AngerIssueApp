import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const Feelings = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const data = Array.from({ length: 9 }, (_, index) => ({
    id: index,
    text: "Lorem ipsum",
  }));

  const handleSelect = (id) => {
    setSelectedItem(id);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.card,
        item.id === selectedItem && styles.selectedCard,
      ]}
      onPress={() => handleSelect(item.id)}
    >
      <View style={styles.circle}>
        <Ionicons name="arrow-forward" size={24} color="#274472" />
      </View>
      <Text style={styles.cardText}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#5885AF", "#5885AF"]} style={styles.background}>
      <Header onBack={() => navigation.goBack()} title="Feeling" />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
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

export default Feelings;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  grid: {
    padding: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    aspectRatio: 1, // Makes the card square
    borderRadius: 10,
    backgroundColor: "#FFFFFF1A",
    boxShadow: "0px 1px 2px 0px #E4E5E73D",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCard: {
    backgroundColor: "#274472",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    marginTop: 8,
    color: "#FFF",
    fontSize: 14,
    textAlign: "center",
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
