import SWR from "swr";
import { addPostAction, fetcher, removePostAction } from "@/actions";
import { IPost } from "@/types";
import { useCallback } from "react";
import { toastError, toastSuccess } from "@/helpers";

export const useFetchPosts = () => {
    const { data, error, isLoading, mutate } = SWR<IPost[], string>("/posts", fetcher);

    const addPost = useCallback(
        async (newPost: IPost) => {
            try {
                await mutate((posts) => addPostAction(newPost, posts), {
                    optimisticData: (posts) => [newPost, ...(posts ?? [])],
                    populateCache: true,
                    revalidate: false,
                });
                toastSuccess("Successfully added post");
            } catch {
                toastError("Failed to add post");
            }
        },
        [mutate]
    );

    const removePost = useCallback(
        async (postId: number) => {
            try {
                await mutate((posts) => removePostAction(postId, posts), {
                    optimisticData: (posts) => (posts ?? []).filter((photo) => photo.id !== postId),
                    populateCache: true,
                    revalidate: false,
                });
                toastSuccess("Successfully removed post");
            } catch {
                toastError("Failed to removed post");
            }
        },
        [mutate]
    );

    return { data, error, isLoading, addPost, removePost };
};
