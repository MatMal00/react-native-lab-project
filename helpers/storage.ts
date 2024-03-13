import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const setStorageItemAsync = async (key: string, value: string | null) => {
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
};

export const getStorageItemAsync = (key: string) => {
    if (Platform.OS === "web") {
        try {
            const item = localStorage.getItem(key);
            if (item) return JSON.parse(item);
        } catch {
            return null;
        }
    } else {
        try {
            const item = SecureStore.getItem(key);
            if (item) return JSON.parse(item);
        } catch {
            return null;
        }
    }
};
