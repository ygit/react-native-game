import { Text, View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

type NumberContainerProps = {
  children: number;
};

export const NumberContainer: React.FC<NumberContainerProps> = ({
  children,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: 24,
    borderRadius: 8,
    margin: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: Colors.accent500,
    fontSize: 36,
    fontFamily: "open-sans-bold",
  },
});
