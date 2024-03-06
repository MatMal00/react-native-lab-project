import SWR from "swr";
import { fetcher } from "@/actions";
import { IUser } from "@/types";

export const useFetchUserDetails = (userId: number) => {
    const { data, error, isLoading } = SWR<IUser, string>(`/users/${userId}`, fetcher);
    return { data, error, isLoading };
};
