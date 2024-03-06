import { fetcher } from "@/actions";
import { IUser } from "@/types";
import SWR from "swr";

export const useFetchAllUsers = () => {
    const { data, error, isLoading } = SWR<IUser[], string>(`/users`, fetcher);
    return { data, error, isLoading };
};
