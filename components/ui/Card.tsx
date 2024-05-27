import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import React from "react";

type CardProps = {
  children: React.ReactNode;
  style?: object;
};

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 36,
    marginHorizontal: 24,
    borderRadius: 8,
    elevation: 8,
    padding: 16,
    backgroundColor: Colors.primary800,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    alignItems: "center",
    justifyContent: "center",
  },
});
