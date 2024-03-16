import { FontAwesome } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

interface IAvatarProps {
    onPress?: () => void;
    size?: number;
}

const Avatar = ({ onPress, size = 45 }: IAvatarProps) => {
    return (
        <Pressable onPress={onPress} style={styles.avatar}>
            <FontAwesome name="user-secret" size={size} color={"#c2a83e"} style={{ marginLeft: 5 }} />
        </Pressable>
    );
};

export default Avatar;

const styles = StyleSheet.create({
    avatar: {
        padding: 20,
        borderColor: "#c2a83e",
        borderWidth: 1,
        borderRadius: 200,
        aspectRatio: 1,
    },
});
