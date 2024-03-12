import { useCallback } from "react";
import useSWRMutation from "swr/mutation";
import useImmutableSWR from "swr/immutable";
import { getUserFromLocalStorage, sendLoginCall, updateUserDataAction } from "@/actions";
import * as SecureStore from "expo-secure-store";
import { apiErrorHandler, toastError, toastSuccess } from "@/helpers";
import { IUser } from "@/types";
import { router } from "expo-router";
import { ROUTE } from "@/constants";

export const useAuth = () => {
    const { data: user, mutate } = useImmutableSWR<IUser | undefined>("/user", {
        fallbackData: getUserFromLocalStorage(),
    });
    const { trigger, isMutating: isLoading, error } = useSWRMutation("/users", sendLoginCall);

    const login = useCallback(
        async (email: string) => {
            try {
                const userToLogin = await trigger({ email });

                mutate(userToLogin, { revalidate: false });
                SecureStore.setItem("user", JSON.stringify(userToLogin));

                router.replace(ROUTE.HOME);
            } catch (error) {
                toastError(apiErrorHandler(error));
            }
        },
        [mutate, trigger]
    );

    const updateUserData = useCallback(
        async (updatedData: Partial<IUser>) => {
            try {
                if (user)
                    await mutate(() => updateUserDataAction(updatedData, user), {
                        optimisticData: { ...user, ...updatedData },
                        populateCache: true,
                        revalidate: false,
                    });
                toastSuccess("Successfully updated user data");
            } catch {
                toastError("Failed to update user data");
            }
        },
        [mutate, user]
    );

    const logout = useCallback(async () => {
        mutate(undefined, { revalidate: false });
        try {
            await SecureStore.deleteItemAsync("user");
        } catch {
            return;
        }
    }, [mutate]);

    return { user, login, logout, updateUserData, isLoading, error, isLoggedIn: !!user };
};
