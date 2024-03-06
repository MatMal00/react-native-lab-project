import { useCallback } from "react";
import useSWRImmutable from "swr/immutable";
import { IPhoto } from "@/types";
import { addPhotoToAlbumAction, fetcher, removePhotoFromAlbumAction } from "@/actions";
import { toastError, toastSuccess } from "@/helpers";

export const useFetchAlbum = (albumId?: string) => {
    const { data, error, isLoading, mutate } = useSWRImmutable<IPhoto[], string>(`/photos?albumId=${albumId}`, fetcher);

    const addPhotoToAlbum = useCallback(
        async (newPhoto: IPhoto) => {
            try {
                await mutate((photos) => addPhotoToAlbumAction(newPhoto, photos, albumId), {
                    optimisticData: (photos) => [newPhoto, ...(photos ?? [])],
                    populateCache: true,
                    revalidate: false,
                });
                toastSuccess("Successfully added the photo");
            } catch {
                toastError("Failed to add photo");
            }
        },
        [albumId, mutate]
    );

    const removePhotoFromAlbum = useCallback(
        async (photoId: number) => {
            try {
                await mutate((photos) => removePhotoFromAlbumAction(photoId, photos), {
                    optimisticData: (photos) => (photos ?? []).filter((photo) => photo.id !== photoId),
                    populateCache: true,
                    revalidate: false,
                });
                toastSuccess("Successfully removed the photo");
            } catch {
                toastError("Failed to removed photo");
            }
        },
        [mutate]
    );

    return { data, error, isLoading, addPhotoToAlbum, removePhotoFromAlbum };
};
