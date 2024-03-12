import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

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
                    headerRight: () => (
                        <Link href="/modal" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="info-circle"
                                        size={25}
                                        color={Colors[colorScheme ?? "light"].text}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Tabs.Screen
                name="albums/index"
                options={{
                    title: "Albums",
                    tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
                }}
            />
            <Tabs.Screen
                name="login/index"
                options={{
                    title: "Login",
                    tabBarIcon: ({ color }) => <TabBarIcon name="lock" color={color} />,
                }}
            />
            <Tabs.Screen
                name="posts/index"
                options={{
                    title: "Posts",
                    tabBarIcon: ({ color }) => <TabBarIcon name="pencil" color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings/index"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
                }}
            />
        </Tabs>
    );
}
