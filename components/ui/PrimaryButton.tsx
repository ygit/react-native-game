import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/colors";

type PrimaryButtonProps = {
  children: string;
  onPress: () => void;
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onPress,
}) => {
  return (
    <View style={styles.outerContainer}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed
            ? [styles.innerContainer, styles.pressed]
            : styles.innerContainer
        }
        android_ripple={{ color: Colors.primary700 }}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 36,
    margin: 4,
    overflow: "hidden",
    padding: 8,
  },
  innerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "open-sans-bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
