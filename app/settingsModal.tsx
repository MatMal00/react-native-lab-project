import { ScrollView, StyleSheet, TextInput } from "react-native";

import { Text, View, useThemeColor } from "@/components/Themed";
import { useFetchAllUsers } from "@/libs";
import UpdateUserDataForm from "@/components/UpdateUserDataForm";
import Card from "@/components/Card/Card";
import { useState } from "react";
import CardText from "@/components/Card/CardText";

const SettingsModal = () => {
    const [search, setSearch] = useState("");
    const color = useThemeColor({ dark: "#fff", light: "#000" }, "text");
    const { data } = useFetchAllUsers();

    const filteredUsers = data?.length
        ? data.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
        : [];
    return (
        <>
            <ScrollView>
                <UpdateUserDataForm />
                {data?.length ? (
                    <Card>
                        <TextInput
                            style={{ color, ...styles.input }}
                            onChangeText={(value) => setSearch(value)}
                            value={search}
                            placeholder="Search"
                        />
                        {filteredUsers.map((user, index) => (
                            <View style={{ backgroundColor: "transparent" }}>
                                <Text style={{ color: "#c2a83e", alignSelf: "center", fontSize: 25 }}>
                                    User No. {index + 1}
                                </Text>
                                <View style={styles.userDetailsContainer}>
                                    <View style={styles.row}>
                                        <CardText style={styles.header}>Name:</CardText>
                                        <CardText style={styles.description}>{user.name}</CardText>
                                    </View>
                                    <View style={styles.row}>
                                        <CardText style={styles.header}>Username:</CardText>
                                        <CardText style={styles.description}>{user.username}</CardText>
                                    </View>
                                    <View style={styles.row}>
                                        <CardText style={styles.header}>Email:</CardText>
                                        <CardText style={styles.description}>{user.email}</CardText>
                                    </View>
                                    <View style={styles.row}>
                                        <CardText style={styles.header}>Phone:</CardText>
                                        <CardText style={styles.description}>{user.phone}</CardText>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </Card>
                ) : null}
            </ScrollView>
        </>
    );
};
export default SettingsModal;

const styles = StyleSheet.create({
    container: {
        padding: 14,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
    userDetailsContainer: {
        marginTop: 20,
        alignItems: "center",
        width: 340,
        backgroundColor: "transparent",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "transparent",
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
