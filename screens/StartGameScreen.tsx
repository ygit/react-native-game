import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  Text,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import React, { useState } from "react";
import { Colors } from "../constants/colors";
import { Title } from "../components/ui/Title";
import { Card } from "../components/ui/Card";

type StartGameScreenProps = {
  onPickNumber: (number: number) => void;
};

export const StartGameScreen: React.FC<StartGameScreenProps> = ({
  onPickNumber,
}) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const numberInputHandler = (inputText: string) => {
    setEnteredNumber(inputText.replace(/[^0-9]/g, ""));
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // show an alert
      Alert.alert("Invalid number!", "Number has to be between 1 and 99.", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    onPickNumber(chosenNumber);
  };

  const resetInputHandler = () => {
    setEnteredNumber("");
  };

  const { width, height } = useWindowDimensions();

  const marginTopDistance = height < 400 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior="position"
        keyboardVerticalOffset={30}
      >
        <SafeAreaView
          style={[styles.container, { marginTop: marginTopDistance }]}
        >
          <Title text={"Guess My Number!"} />
          <Card>
            <Text style={styles.text}>Enter a Number</Text>
            <TextInput
              style={styles.textInput}
              maxLength={2}
              keyboardType={"numeric"}
              autoCapitalize={"none"}
              autoCorrect={false}
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonOuterContainer}>
              <View style={styles.buttonInnerContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonInnerContainer}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    fontFamily: "open-sans-bold",
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    textAlign: "center",
  },
  buttonOuterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  buttonInnerContainer: {
    flex: 1,
  },
  text: {
    color: Colors.accent500,
    fontSize: 24,
    fontFamily: "open-sans-bold",
  },
});
