import { AxiosError } from "axios";
import { updateRequest } from "./mutations";
import api from "@/api";
import { httpStatus } from "@/helpers";
import { IUser } from "@/types";
import * as SecureStore from "expo-secure-store";

export const sendLoginCall = async (url: string, { arg: { email } }: { arg: { email: string } }) => {
    const response = await api().get<IUser[]>(url);

    const status = httpStatus(response.status);
    if (status !== "success") throw response;

    const user = response.data.find((user) => user.email === email);

    if (user) return user;
    else throw new AxiosError("Failed to log in");
};

export const getUserFromLocalStorage = (): IUser | undefined => {
    try {
        const user = SecureStore.getItem("user");
        if (user) return JSON.parse(user);
    } catch {
        return;
    }
};

export const updateUserDataAction = async (updatedData: Partial<IUser>, user: IUser) => {
    (await updateRequest<{ data: IUser }>(`/users/${user.id}`, updatedData)).data;
    return { ...user, ...updatedData };
};
