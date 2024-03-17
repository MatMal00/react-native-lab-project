import { Image, StyleSheet, Text } from "react-native";

import { View } from "@/components/Themed";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                src="https://media.istockphoto.com/id/1255193292/photo/twin-towers-nyc.jpg?s=612x612&w=0&k=20&c=1AIC-LySUbFb0t16cGQa62DX1l8jih2d85jQ63_m8Is="
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}
            />
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                    backgroundColor: "#0000005b",
                }}
            />
            <View
                style={{
                    backgroundColor: "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 100,
                }}
            >
                <Text style={{ color: "#fff", fontSize: 60, fontWeight: "bold" }}>PROJECT</Text>
                <Text style={{ color: "#fff" }}>Lorem ipsum dolor sit amet, consectetur</Text>
            </View>
        </View>
    );
};
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        position: "relative",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
