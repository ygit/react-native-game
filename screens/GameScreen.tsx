import { Text, View, StyleSheet } from "react-native";

export const GameScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Opponent's Guess</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  imageContainer: {
    flex: 1,
    opacity: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ddb52f",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#ddb52f",
    padding: 12,
  },
});
