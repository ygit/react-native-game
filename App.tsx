import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StartGameScreen } from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { GameScreen } from "./screens/GameScreen";
import { Colors } from "./constants/colors";
import { GameOverScreen } from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function App() {
  const [userNumber, setUserNumber] = useState<number>();
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [guessRounds, setGuessRounds] = useState<number>(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber);
    setGameOver(false);
  };

  const gameOverHandler = (rounds: number) => {
    setGameOver(true);
    setGuessRounds(rounds);
  };

  const startNewGameHandler = () => {
    setUserNumber(undefined);
    setGuessRounds(0);
    setGameOver(false);
  };

  let screen = <StartGameScreen onPickNumber={setUserNumber} />;

  if (userNumber) {
    screen = (
      <GameScreen userChoice={userNumber} gameOverHandler={gameOverHandler} />
    );
  }

  if (gameOver && userNumber) {
    screen = (
      <GameOverScreen
        userChoice={userNumber}
        roundsNumber={guessRounds}
        startNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary800, Colors.accent500]}
        style={styles.container}
      >
        <ImageBackground
          source={require("./assets/background.png")}
          resizeMode={"cover"}
          style={styles.container}
          imageStyle={styles.imageContainer}
        >
          <SafeAreaView style={styles.container}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    opacity: 0.5,
  },
});
