import { Pressable, ScrollView, StyleSheet } from "react-native";
import { IAlbum } from "@/types";
import { Text, View } from "@/components/Themed";
import { useState } from "react";
import { useAuth, useFetchAlbums } from "@/libs";
import { ActionsHandler } from "@/components/ActionsHandler";
import { CheckBox } from "react-native-btr";
import Card from "@/components/Card/Card";
import { INavigationType } from "@/types/navigation";
import { useNavigation } from "expo-router";
import CardText from "@/components/Card/CardText";
import { FontAwesome } from "@expo/vector-icons";

const AlbumsScreen = () => {
    const [isChecked, setIsChecked] = useState(false);
    const { user, isLoggedIn } = useAuth();
    const navigation = useNavigation<INavigationType>();
    const albumsState = useFetchAlbums();

    return (
        <ActionsHandler<IAlbum[]> {...albumsState}>
            {(albums) => {
                const filteredAlbums = isChecked && user ? albums.filter((album) => album.userId === user.id) : albums;

                return (
                    <>
                        {isLoggedIn && (
                            <View style={{ flexDirection: "row", gap: 10, padding: 20 }}>
                                <CheckBox
                                    onPress={() => setIsChecked((prev) => !prev)}
                                    checked={isChecked}
                                    color="#c2a83e"
                                />
                                <Text>Show my albums</Text>
                            </View>
                        )}
                        <ScrollView style={styles.container}>
                            {filteredAlbums.map((album) => (
                                <Pressable onPress={() => navigation.navigate("photos", { id: album.id })}>
                                    <Card key={album.id}>
                                        <CardText style={styles.title}>{album.title}</CardText>
                                        <FontAwesome
                                            name="book"
                                            size={140}
                                            color={"#c2a83e"}
                                            style={{ alignSelf: "center" }}
                                        />
                                    </Card>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </>
                );
            }}
        </ActionsHandler>
    );
};
export default AlbumsScreen;

const styles = StyleSheet.create({
    container: {
        padding: 14,
    },
    avatar: {
        alignSelf: "center",
    },
    title: {
        fontSize: 20,
        alignSelf: "center",
    },
});
