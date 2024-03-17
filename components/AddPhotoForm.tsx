import { getRandomNumber } from "@/helpers";
import { useFetchAlbum } from "@/libs";
import { IPhoto } from "@/types";
import { Formik } from "formik";
import { Button, GestureResponderEvent, StyleSheet, TextInput } from "react-native";
import { View, useThemeColor } from "./Themed";

interface IAddPostFormProps {
    userId: number;
    albumId: string;
}

const AddPhotoForm = ({ userId, albumId }: IAddPostFormProps) => {
    const { addPhotoToAlbum } = useFetchAlbum(albumId);
    const color = useThemeColor({ dark: "#fff", light: "#000" }, "text");

    return (
        <Formik
            initialValues={{ photoUrl: "", title: "" }}
            onSubmit={({ title, photoUrl }, { resetForm }) => {
                if (albumId) {
                    const newPhoto: IPhoto = {
                        albumId: +albumId,
                        title,
                        url: photoUrl,
                        thumbnailUrl: photoUrl,
                        id: getRandomNumber(1000, 10000),
                        userId,
                    };
                    addPhotoToAlbum(newPhoto);
                    resetForm();
                }
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View style={styles.form}>
                    <TextInput
                        style={{ color, ...styles.input }}
                        onChangeText={handleChange("title")}
                        onBlur={handleBlur("title")}
                        value={values.title}
                        placeholder="Title"
                    />
                    <TextInput
                        style={{ color, ...styles.input }}
                        onChangeText={handleChange("photoUrl")}
                        onBlur={handleBlur("photoUrl")}
                        value={values.photoUrl}
                        placeholder="Photo url"
                    />
                    <View style={styles.button}>
                        <Button
                            onPress={handleSubmit as (e?: GestureResponderEvent) => void}
                            title="Add photo"
                            color="#000"
                        />
                    </View>
                </View>
            )}
        </Formik>
    );
};

export default AddPhotoForm;

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
