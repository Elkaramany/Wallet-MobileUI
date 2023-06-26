import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-community/masked-view";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "@react-navigation/native";
import { GlobalStyles } from "../Config";

const GradientText = (props: any) => {
    const { colors }: any = useTheme();

    return (
        <MaskedView maskElement={<Text {...props} />}>
            <LinearGradient
                colors={colors.gradientButton}
                start={{ x: 0, y: 0 }}
                end={props?.end || { x: 1, y: 0.35 }}
            >
                <Text {...props} style={[GlobalStyles.regularText, props.style, { opacity: 0 }]} />
            </LinearGradient>
        </MaskedView>
    );
};

export default GradientText;