import { Text, View, StyleSheet, Alert } from "react-native";
import { Title } from "../components/ui/Title";
import React, { useState } from "react";
import { NumberContainer } from "../components/game/NumberContainer";
import { PrimaryButton } from "../components/ui/PrimaryButton";

const generateRandomNumber = (
  min: number,
  max: number,
  exclude: number,
): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return randomNumber;
  }
};

type GameScreenProps = {
  userChoice: number;
};

export const GameScreen: React.FC<GameScreenProps> = ({ userChoice }) => {
  const initialGuess = generateRandomNumber(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  let minBoundary = 1;
  let maxBoundary = 100;
  const nextGuessHandler = (direction: "lower" | "higher") => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "higher" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    console.log(minBoundary, maxBoundary);
    setCurrentGuess(
      generateRandomNumber(minBoundary, maxBoundary, currentGuess),
    );
  };

  const higherHandler = () => {
    nextGuessHandler("higher");
  };

  const lowerHandler = () => {
    nextGuessHandler("lower");
  };

  return (
    <View style={styles.container}>
      <Title text={"Opponent's Guess"} />
      <NumberContainer>{initialGuess}</NumberContainer>
      <View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={higherHandler}>Higher</PrimaryButton>
          <PrimaryButton onPress={lowerHandler}>Lower</PrimaryButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    maxWidth: "100%",
    padding: 8,
  },
});
