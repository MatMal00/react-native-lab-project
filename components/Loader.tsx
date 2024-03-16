import { ActivityIndicator, StyleSheet } from "react-native";

import { View } from "@/components/Themed";

const Loader = () => {
    return (
        <View style={[styles.container]}>
            <ActivityIndicator size="large" color="#c2a83e" />
        </View>
    );
};
export default Loader;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});
