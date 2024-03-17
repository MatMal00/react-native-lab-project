import { ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useRoute } from "@react-navigation/native";
import { useFetchComments } from "@/libs";
import { ActionsHandler } from "@/components/ActionsHandler";
import { IComment } from "@/types";
import Avatar from "@/components/Avatar";
import Card from "@/components/Card/Card";
import CardText from "@/components/Card/CardText";

const CommentsModalScreen = () => {
    const {
        params: { title, id },
    } = useRoute<any>();
    const commentsState = useFetchComments(id);

    return (
        <ActionsHandler<IComment[]> {...commentsState}>
            {(comments) => (
                <View style={styles.container}>
                    <Avatar />
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>
                        {comments.length === 1 ? `${comments.length} Comment` : `${comments.length} Comments`}
                    </Text>

                    <ScrollView style={styles.scrollView}>
                        {comments.map((comment) => (
                            <Card>
                                <CardText style={styles.scrollViewTitle}>{comment.email}</CardText>
                                <CardText style={styles.scrollViewDescription}>{comment.body}</CardText>
                            </Card>
                        ))}
                    </ScrollView>
                </View>
            )}
        </ActionsHandler>
    );
};
export default CommentsModalScreen;

const styles = StyleSheet.create({
    container: {
        padding: 14,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "flex-start",
    },
    description: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 18,
        alignSelf: "flex-start",
    },
    scrollView: {
        paddingHorizontal: 5,
    },
    scrollViewTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    scrollViewDescription: {
        fontSize: 18,
    },
});
