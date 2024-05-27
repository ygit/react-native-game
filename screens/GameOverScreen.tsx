import { Image, View, StyleSheet, Text } from "react-native";
import React from "react";
import { Title } from "../components/ui/Title";
import { Colors } from "../constants/colors";
import { PrimaryButton } from "../components/ui/PrimaryButton";

type GameOverScreenProps = {
  roundsNumber: number;
  userChoice: number;
  startNewGame: () => void;
};

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  roundsNumber,
  userChoice,
  startNewGame,
}) => {
  return (
    <View style={styles.container}>
      <Title text={"Game Over"} />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/success.png")}
          resizeMode={"cover"}
        />
      </View>
      <View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{userChoice}</Text>
        </Text>
      </View>
      <PrimaryButton onPress={startNewGame}>Start a New Game</PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 400,
    height: 400,
    borderRadius: 200,
    overflow: "hidden",
    alignSelf: "center",
    borderWidth: 3,
    borderColor: Colors.primary800,
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    color: Colors.primary800,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    color: Colors.primary500,
    fontFamily: "open-sans-bold",
  },
});
