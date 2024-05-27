import { Text, View, StyleSheet, Alert, FlatList } from "react-native";
import { Title } from "../components/ui/Title";
import React, { useEffect, useState } from "react";
import { NumberContainer } from "../components/game/NumberContainer";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Card } from "../components/ui/Card";
import { Colors } from "../constants/colors";

const generateRandomNumber = (
  min: number,
  max: number,
  exclude: number,
): number => {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;
  if (randomNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return randomNumber;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

type GameScreenProps = {
  userChoice: number;
  gameOverHandler: (rounds: number) => void;
};

export const GameScreen: React.FC<GameScreenProps> = ({
  userChoice,
  gameOverHandler,
}) => {
  const initialGuess = generateRandomNumber(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userChoice) {
      gameOverHandler(guessRounds.length);
    }
  }, [currentGuess, userChoice, gameOverHandler]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

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
    const nextNumber = generateRandomNumber(
      minBoundary,
      maxBoundary,
      currentGuess,
    );
    console.log(
      minBoundary,
      maxBoundary,
      currentGuess,
      initialGuess,
      nextNumber,
    );
    setCurrentGuess(nextNumber);
    setGuessRounds((prevState) => [nextNumber, ...prevState]);
  };

  const higherHandler = () => {
    nextGuessHandler("higher");
  };

  const lowerHandler = () => {
    nextGuessHandler("lower");
  };

  const renderListItem = (listLength: number, itemData: any) => (
    <View style={styles.listItem}>
      <Text style={styles.listText}>#{listLength - itemData.index}</Text>
      <Text style={styles.listText}>{itemData.item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Title text={"Opponent's Guess"} />
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={higherHandler}>Higher</PrimaryButton>
          <PrimaryButton onPress={lowerHandler}>Lower</PrimaryButton>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={renderListItem.bind(null, guessRounds.length)}
          keyExtractor={(item) => item.toString()}
        />
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
  listContainer: {
    flex: 1,
    width: "100%",
  },
});
