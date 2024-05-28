import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

type ListItemProps = {
  listLength: number;
  index: number;
  item: number;
};

export const ListItem: React.FC<ListItemProps> = ({
  listLength,
  item,
  index,
}) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listText}>#{listLength - index}</Text>
      <Text style={styles.listText}>{item}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: Colors.accent500,
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: Colors.primary500,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  listText: {
    color: Colors.accent500,
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
});
