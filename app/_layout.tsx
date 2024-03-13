import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { SWRConfig } from "swr";
import Toast from "react-native-toast-message";
import RouteProtector from "@/components/RouteProtector";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <SWRConfig
            value={{
                provider: () => new Map(),
                isOnline() {
                    /* Customize the network state detector */
                    return true;
                },
                isVisible() {
                    /* Customize the visibility state detector */
                    return true;
                },
                initFocus(_callback) {
                    /* Register the listener with your state provider */
                },
                initReconnect(_callback) {
                    /* Register the listener with your state provider */
                },
            }}
        >
            <RootLayoutNav />
        </SWRConfig>
    );
};
export default RootLayout;

const RootLayoutNav = () => {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <RouteProtector>
                <Stack>
                    <Stack.Screen name="(public)" options={{ headerShown: false }} />
                    <Stack.Screen name="modal" options={{ presentation: "modal" }} />
                </Stack>
            </RouteProtector>
            <Toast />
        </ThemeProvider>
    );
};
