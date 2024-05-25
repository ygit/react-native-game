import {TextInput, View, StyleSheet} from "react-native";
import {PrimaryButton} from "../components/PrimaryButton";

export const StartGameScreen = () => {
    return (
        <View>
            <TextInput />
            <PrimaryButton>Start Game</PrimaryButton>
            <PrimaryButton>Reset</PrimaryButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
});
