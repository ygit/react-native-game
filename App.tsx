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

export default function App() {
  const [userNumber, setUserNumber] = useState<number>();

  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber);
  };

  let screen = <StartGameScreen onPickNumber={setUserNumber} />;

  if (userNumber) {
    screen = <GameScreen />;
  }

  return (
    <LinearGradient colors={["#250212", "#ddb52f"]} style={styles.container}>
      <ImageBackground
        source={require("./assets/background.png")}
        resizeMode={"cover"}
        style={styles.container}
        imageStyle={styles.imageContainer}
      >
        <SafeAreaView style={styles.container}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
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
