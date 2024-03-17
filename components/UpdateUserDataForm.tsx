import { Formik } from "formik";
import { Button, GestureResponderEvent, StyleSheet, TextInput } from "react-native";
import { View, useThemeColor } from "./Themed";
import { useAuth } from "@/libs";
import Card from "./Card/Card";

const UpdateUserDataForm = () => {
    const { updateUserData, user } = useAuth();
    const color = useThemeColor({ dark: "#fff", light: "#000" }, "text");
    const { name, username, email, phone, website } = user ?? {};

    return (
        <Card>
            <Formik
                initialValues={{ name, username, email, phone, website }}
                onSubmit={(updatedData) => updateUserData(updatedData)}
                enableReinitialize
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={styles.form}>
                        <TextInput
                            style={{ color, ...styles.input }}
                            onChangeText={handleChange("email")}
                            onBlur={handleBlur("email")}
                            value={values.email}
                            placeholder="Email"
                        />
                        <TextInput
                            style={{ color, ...styles.input }}
                            onChangeText={handleChange("name")}
                            onBlur={handleBlur("name")}
                            value={values.name}
                            placeholder="Name"
                        />
                        <TextInput
                            style={{ color, ...styles.input }}
                            onChangeText={handleChange("phone")}
                            onBlur={handleBlur("phone")}
                            value={values.phone}
                            placeholder="phone"
                        />
                        <TextInput
                            style={{ color, ...styles.input }}
                            onChangeText={handleChange("username")}
                            onBlur={handleBlur("username")}
                            value={values.username}
                            placeholder="UserName"
                        />
                        <TextInput
                            style={{ color, ...styles.input }}
                            onChangeText={handleChange("website")}
                            onBlur={handleBlur("website")}
                            value={values.website}
                            placeholder="Website"
                        />
                        <View style={styles.button}>
                            <Button
                                onPress={handleSubmit as (e?: GestureResponderEvent) => void}
                                color="#000"
                                title="Edit"
                            />
                        </View>
                    </View>
                )}
            </Formik>
        </Card>
    );
};

export default UpdateUserDataForm;

const styles = StyleSheet.create({
    avatar: {
        padding: 20,
        borderColor: "#c2a83e",
        borderWidth: 1,
        borderRadius: 200,
        aspectRatio: 1,
    },
    form: {
        padding: 40,
        display: "flex",
        gap: 20,
        width: "100%",
        backgroundColor: "transparent",
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
