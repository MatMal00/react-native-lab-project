import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useAuth } from "@/libs";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const TabLayout = () => {
    const { isLoggedIn, logout } = useAuth();
    const colorScheme = useColorScheme();

    const headerIcon = isLoggedIn ? (
        <Link href="/profile" asChild>
            <Pressable>
                {({ pressed }) => (
                    <FontAwesome
                        name="user-circle"
                        size={25}
                        color={Colors[colorScheme ?? "light"].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                )}
            </Pressable>
        </Link>
    ) : null;

    const signOutIcon = isLoggedIn ? (
        <Pressable onPress={logout}>
            {({ pressed }) => (
                <FontAwesome
                    name="sign-out"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginLeft: 15, opacity: pressed ? 0.5 : 1 }}
                />
            )}
        </Pressable>
    ) : null;

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: useClientOnlyValue(false, true),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                    headerRight: () => headerIcon,
                    headerLeft: () => signOutIcon,
                }}
            />
            <Tabs.Screen
                name={"albums"}
                options={{
                    title: "Albums",
                    tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
                    headerRight: () => headerIcon,
                    headerLeft: () => signOutIcon,
                }}
            />
            <Tabs.Screen
                name="posts"
                options={{
                    title: "Posts",
                    tabBarIcon: ({ color }) => <TabBarIcon name="pencil" color={color} />,
                    headerRight: () => headerIcon,
                    headerLeft: () => signOutIcon,
                }}
            />
            <Tabs.Screen
                name="login"
                options={{
                    title: "Login",
                    tabBarIcon: ({ color }) => <TabBarIcon name="lock" color={color} />,
                    href: !isLoggedIn ? "login" : null,
                }}
            />
            <Tabs.Screen
                name="photos"
                options={{
                    title: "Photos",
                    href: null,
                }}
            />
        </Tabs>
    );
};
export default TabLayout;
