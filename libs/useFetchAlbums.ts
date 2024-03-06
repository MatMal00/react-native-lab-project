import { fetcher } from "@/actions";
import { IAlbum } from "@/types";
import SWR from "swr";

export const useFetchAlbums = () => {
    const { data, error, isLoading } = SWR<IAlbum[], string>("/albums", fetcher);
    return { data, error, isLoading };
};
