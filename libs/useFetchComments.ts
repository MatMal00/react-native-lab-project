import SWR from "swr";
import { addCommentAction, fetcher, removeCommentAction } from "@/actions";
import { IComment } from "@/types";
import { useCallback } from "react";
import { toastError, toastSuccess } from "@/helpers";

export const useFetchComments = (postId: number) => {
    const { data, error, isLoading, mutate } = SWR<IComment[], string>(`/posts/${postId}/comments`, fetcher);

    const addComment = useCallback(
        async (newComment: IComment) => {
            try {
                await mutate((comments) => addCommentAction(newComment, comments, postId), {
                    optimisticData: (comments) => [newComment, ...(comments ?? [])],
                    populateCache: true,
                    revalidate: false,
                });
                toastSuccess("Successfully added comment");
            } catch {
                toastError("Failed to add comment");
            }
        },
        [postId, mutate]
    );

    const removeComment = useCallback(
        async (commentId: number) => {
            try {
                await mutate((comments) => removeCommentAction(commentId, comments), {
                    optimisticData: (comments) => (comments ?? []).filter((comment) => comment.id !== commentId),
                    populateCache: true,
                    revalidate: false,
                });
                toastSuccess("Successfully removed comment");
            } catch {
                toastError("Failed to removed comment");
            }
        },
        [mutate]
    );

    return { data, error, isLoading, addComment, removeComment };
};
