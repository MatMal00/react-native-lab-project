import { Image, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { useAuth, useFetchAlbum } from "@/libs";
import { ActionsHandler } from "@/components/ActionsHandler";
import { IPhoto } from "@/types";
import { CheckBox } from "react-native-btr";
import { Text } from "@/components/Themed";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import AddPhotoForm from "@/components/AddPhotoForm";
import { FontAwesome } from "@expo/vector-icons";

const PhotosScreen = () => {
    const {
        params: { id },
    } = useRoute<any>();
    const [isChecked, setIsChecked] = useState(false);
    const { user, isLoggedIn } = useAuth();
    const { removePhotoFromAlbum, ...photosState } = useFetchAlbum(id);

    return (
        <ActionsHandler<IPhoto[]> {...photosState}>
            {(photos) => {
                const filteredPhotos = isChecked && user ? photos.filter((photo) => photo.userId === user.id) : photos;

                return (
                    <>
                        {isLoggedIn && (
                            <View style={{ flexDirection: "row", gap: 10, padding: 20 }}>
                                <CheckBox
                                    onPress={() => setIsChecked((prev) => !prev)}
                                    checked={isChecked}
                                    color="#c2a83e"
                                />
                                <Text>Show my photos</Text>
                            </View>
                        )}
                        <ScrollView style={styles.container}>
                            <>
                                {isLoggedIn && user && <AddPhotoForm albumId={id} userId={user.id} />}
                                {filteredPhotos.map((photo) => (
                                    <View key={photo.id} style={{ position: "relative" }}>
                                        {isLoggedIn && photo.userId === user?.id && (
                                            <Pressable
                                                style={styles.removeIcon}
                                                onPress={() => removePhotoFromAlbum(photo.id)}
                                            >
                                                {() => <FontAwesome name="trash" color="red" size={25} />}
                                            </Pressable>
                                        )}

                                        <Image
                                            src={photo.url}
                                            style={{ width: "100%", aspectRatio: 1, marginVertical: 10 }}
                                        />
                                    </View>
                                ))}
                            </>
                        </ScrollView>
                    </>
                );
            }}
        </ActionsHandler>
    );
};
export default PhotosScreen;

const styles = StyleSheet.create({
    container: {
        padding: 14,
    },
    removeIcon: {
        padding: 15,
        position: "absolute",
        left: 10,
        top: 10,
        zIndex: 1,
    },
});
