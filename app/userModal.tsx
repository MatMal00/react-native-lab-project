import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useRoute } from "@react-navigation/native";
import { useFetchUserDetails } from "@/libs";
import { ActionsHandler } from "@/components/ActionsHandler";
import { IUser } from "@/types";
import Avatar from "@/components/Avatar";

const UserModalScreen = () => {
    const {
        params: { id },
    } = useRoute<any>();
    const userState = useFetchUserDetails(id);

    return (
        <ActionsHandler<IUser> {...userState}>
            {(user) => (
                <View style={styles.container}>
                    <View style={styles.avatarContainer}>
                        <Avatar />
                        <Text style={styles.userName}>{user.name}</Text>
                    </View>
                    <Text style={styles.title}>Personal informations</Text>
                    <View style={styles.userDetailsContainer}>
                        <View style={styles.row}>
                            <Text style={styles.header}>Name:</Text>
                            <Text style={styles.description}>{user.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.header}>Email:</Text>
                            <Text style={styles.description}>{user.email}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.header}>Company:</Text>
                            <Text style={styles.description}>{user.company.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.header}>City:</Text>
                            <Text style={styles.description}>{user.address.city}</Text>
                        </View>
                    </View>
                </View>
            )}
        </ActionsHandler>
    );
};
export default UserModalScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        marginTop: 20,
        fontSize: 22,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    avatarContainer: {
        gap: 20,
        alignItems: "center",
    },
    userName: {
        fontSize: 30,
    },
    userDetailsContainer: {
        marginTop: 20,
        alignItems: "center",
        width: 300,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
    },
    description: {
        fontSize: 20,
    },
});
