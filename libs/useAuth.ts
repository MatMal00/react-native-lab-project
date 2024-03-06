// import { useCallback } from "react";
// import useSWRMutation from "swr/mutation";
// import useImmutableSWR from "swr/immutable";
// import { getUserFromLocalStorage } from "@/actions";
// import toast from "react-hot-toast";

// export const useAuth = () => {
//     const { data: user, mutate } = useImmutableSWR<IUser | undefined>("/user", {
//         fallbackData: getUserFromLocalStorage(),
//     });
//     const { trigger, isMutating: isLoading, error } = useSWRMutation("/users", sendLoginCall);
//     const { from } = location.state || { from: { pathname: ROUTE.HOME } };

//     const login = useCallback(
//         async (email: string) => {
//             try {
//                 const userToLogin = await trigger({ email });

//                 mutate(userToLogin, { revalidate: false });
//                 window.localStorage.setItem("user", JSON.stringify(userToLogin));

//                 // navigate(from, { replace: true });
//             } catch (error) {
//                 toast.error(apiErrorHandler(error));
//             }
//         },
//         [mutate, navigate, trigger, from]
//     );

//     const updateUserData = useCallback(
//         async (updatedData: Partial<IUser>) => {
//             try {
//                 if (user)
//                     await mutate(() => updateUserDataAction(updatedData, user), {
//                         optimisticData: { ...user, ...updatedData },
//                         populateCache: true,
//                         revalidate: false,
//                     });
//                 toast.success("Successfully updated user data");
//             } catch {
//                 toast.error("Failed to update user data");
//             }
//         },
//         [mutate, user]
//     );

//     const logout = useCallback(() => {
//         mutate(undefined, { revalidate: false });
//         window.localStorage.removeItem("user");
//     }, [mutate]);

//     return { user, login, logout, updateUserData, isLoading, error, isLoggedIn: !!user };
// };
