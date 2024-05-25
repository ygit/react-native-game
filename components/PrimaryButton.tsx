import {Text, View} from "react-native";
import React from "react";

type PrimaryButtonProps = {
    children: string;
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({children}) => {
    return (
        <View>
            <Text>
                {children}
            </Text>
        </View>
    );
};
