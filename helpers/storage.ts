import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function setStorageItemAsync(key: string, value: string | null) {
    if (Platform.OS === "web") {
        try {
            if (value === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, value);
            }
        } catch (e) {
            console.error("Local storage is unavailable:", e);
        }
    } else {
        if (value == null) {
            await SecureStore.deleteItemAsync(key);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    }
}

export async function deleteStorageItemAsync(key: string) {
    if (Platform.OS === "web") {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error("Local storage is unavailable:", e);
        }
    } else {
        await SecureStore.deleteItemAsync(key);
    }
}
