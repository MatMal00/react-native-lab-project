import api from "@/api";
import { apiErrorHandler, httpStatus, toastError } from "@/helpers";

export const fetcher = async <T>(url: string) => {
    try {
        await new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 200);
        }); // fix me - remove delay
        const response = await api().get<T>(url);

        const status = httpStatus(response.status);
        if (status !== "success") throw response;

        return response.data;
    } catch (error) {
        const errorMessage = apiErrorHandler(error);
        toastError(errorMessage);
        throw apiErrorHandler(error);
    }
};
