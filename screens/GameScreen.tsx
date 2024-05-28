import {
  Text,
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Title } from "../components/ui/Title";
import React, { useEffect, useState } from "react";
import { NumberContainer } from "../components/game/NumberContainer";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Card } from "../components/ui/Card";
import { Colors } from "../constants/colors";
import { ListItem } from "../components/ui/ListItem";

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

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={higherHandler}>Higher</PrimaryButton>
          <PrimaryButton onPress={lowerHandler}>Lower</PrimaryButton>
        </View>
      </Card>
    </>
  );

  const { width, height } = useWindowDimensions();

  if (width > 500) {
  }

  return (
    <View style={styles.container}>
      <Title text={"Opponent's Guess"} />
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          // renderItem={renderListItem.bind(null, guessRounds.length)}
          renderItem={({ item, index }) => (
            <ListItem
              listLength={guessRounds.length}
              item={item}
              index={index}
            />
          )}
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
  listContainer: {
    flex: 1,
    width: "100%",
  },
});
