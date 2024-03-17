import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { useAuth, useFetchPosts } from "@/libs";
import { ActionsHandler } from "@/components/ActionsHandler";
import { IPost } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { INavigationType } from "@/types/navigation";
import Card from "@/components/Card/Card";
import CardText from "@/components/Card/CardText";
import Avatar from "@/components/Avatar";
import AddPostForm from "@/components/AddPostForm";
import { CheckBox } from "react-native-btr";
import { Text } from "@/components/Themed";
import { useState } from "react";

const PostsScreen = () => {
    const [isChecked, setIsChecked] = useState(false);
    const { user, isLoggedIn } = useAuth();
    const navigation = useNavigation<INavigationType>();
    const { removePost, ...postsState } = useFetchPosts();

    return (
        <ActionsHandler<IPost[]> {...postsState}>
            {(posts) => {
                const filteredPosts = isChecked && user ? posts.filter((post) => post.userId === user.id) : posts;

                return (
                    <>
                        {isLoggedIn && (
                            <View style={{ flexDirection: "row", gap: 10, padding: 20 }}>
                                <CheckBox
                                    onPress={() => setIsChecked((prev) => !prev)}
                                    checked={isChecked}
                                    color="#c2a83e"
                                />
                                <Text>Show my posts</Text>
                            </View>
                        )}
                        <ScrollView style={styles.container}>
                            {isLoggedIn && user && <AddPostForm userId={user.id} />}
                            {filteredPosts.map((post) => (
                                <Card key={post.id}>
                                    {isLoggedIn && (
                                        <Pressable style={styles.removeIcon} onPress={() => removePost(post.id)}>
                                            {() => <FontAwesome name="trash" color="red" size={25} />}
                                        </Pressable>
                                    )}
                                    <View style={styles.avatar}>
                                        <Avatar onPress={() => navigation.navigate("userModal", { id: post.userId })} />
                                    </View>
                                    <CardText style={styles.title}>{post.title}</CardText>
                                    <CardText>{post.body}</CardText>
                                    <Pressable
                                        style={styles.commentsBtn}
                                        onPress={() =>
                                            navigation.navigate("commentsModal", { title: post.title, id: post.id })
                                        }
                                    >
                                        <CardText style={{ color: "#c2a83e", fontSize: 15 }}>Comments</CardText>
                                        <FontAwesome name="comment-o" size={30} color={"#c2a83e"} style={{}} />
                                    </Pressable>
                                </Card>
                            ))}
                        </ScrollView>
                    </>
                );
            }}
        </ActionsHandler>
    );
};
export default PostsScreen;

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
    commentsBtn: {
        padding: 5,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 1,
        borderTopColor: "white",
    },
    removeIcon: {
        padding: 15,
        position: "absolute",
        left: 10,
        top: 10,
    },
});
