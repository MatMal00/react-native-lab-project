import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { useFetchPosts } from "@/libs";
import { ActionsHandler } from "@/components/ActionsHandler";
import { IPost } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { INavigationType } from "@/types/navigation";
import Card from "@/components/Card/Card";
import CardText from "@/components/Card/CardText";
import Avatar from "@/components/Avatar";

const PostsScreen = () => {
    const navigation = useNavigation<INavigationType>();
    const { ...postsState } = useFetchPosts();
    return (
        <ActionsHandler<IPost[]> {...postsState}>
            {(posts) => (
                <ScrollView style={styles.container}>
                    {posts.map((post) => (
                        <Card key={post.id}>
                            <View style={styles.avatar}>
                                <Avatar onPress={() => navigation.navigate("userModal", { id: post.userId })} />
                            </View>
                            <CardText style={styles.title}>{post.title}</CardText>
                            <CardText>{post.body}</CardText>
                            <Pressable
                                style={styles.commentsBtn}
                                onPress={() => navigation.navigate("commentsModal", { title: post.title, id: post.id })}
                            >
                                <CardText style={{ color: "#c2a83e", fontSize: 15 }}>Comments</CardText>
                                <FontAwesome name="comment-o" size={30} color={"#c2a83e"} style={{}} />
                            </Pressable>
                        </Card>
                    ))}
                </ScrollView>
            )}
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
});
