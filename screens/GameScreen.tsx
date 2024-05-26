import { Text, View, StyleSheet } from "react-native";
import { Title } from "../components/ui/Title";
import React, { useState } from "react";
import { NumberContainer } from "../components/game/NumberContainer";

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
  const [currentGuess, setCurrentGuess] = useState();

  return (
    <View style={styles.container}>
      <Title text={"Opponent's Guess"} />
      <NumberContainer>{initialGuess}</NumberContainer>
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
