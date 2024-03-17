import { Text, View, useThemeColor } from "@/components/Themed";
import { useAuth } from "@/libs";
import { Formik } from "formik";
import { Button, GestureResponderEvent, StyleSheet, TextInput } from "react-native";

const LoginScreen = () => {
    const { login } = useAuth();
    const color = useThemeColor({ dark: "#fff", light: "#000" }, "text");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Formik initialValues={{ email: "", password: "" }} onSubmit={(values) => login(values.email)}>
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={styles.form}>
                        <TextInput
                            style={{ color, ...styles.input }}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            placeholder="E-mail"
                        />
                        <TextInput
                            style={{ color, ...styles.input }}
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            value={values.password}
                            secureTextEntry
                            placeholder="Password"
                        />
                        <View style={styles.button}>
                            <Button
                                onPress={handleSubmit as (e?: GestureResponderEvent) => void}
                                title="Submit"
                                color="#000"
                            />
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        marginBottom: 40,
        fontSize: 40,
        fontWeight: "bold",
    },
    form: {
        padding: 40,
        display: "flex",
        gap: 20,
        width: "100%",
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "#c2a83e",
        borderRadius: 5,
        fontSize: 25,
        width: "100%",
    },
    button: {
        backgroundColor: "#c2a83e",
    },
});
