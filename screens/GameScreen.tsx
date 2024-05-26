import { Text, View, StyleSheet } from "react-native";
import { Title } from "../components/Title";

export const GameScreen = () => {
  return (
    <View style={styles.container}>
      <Title text={"Opponent's Guess"} />
      <View>
        <Text>Higher or Lower?</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
});
