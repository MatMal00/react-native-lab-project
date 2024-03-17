import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { ReactNode } from "react";

interface ICardProps {
    children: ReactNode | ReactNode[];
}

const Card = ({ children }: ICardProps) => {
    return (
        <View style={[styles.card]} darkColor="#343434" lightColor="#343434">
            {children}
        </View>
    );
};
export default Card;

const styles = StyleSheet.create({
    card: {
        position: "relative",
        marginVertical: 15,
        padding: 15,
        display: "flex",
        gap: 15,
        borderRadius: 15,
    },
});
