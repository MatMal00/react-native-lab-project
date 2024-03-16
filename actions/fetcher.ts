import api from "@/api";
import { apiErrorHandler, httpStatus, toastError } from "@/helpers";

export const fetcher = async <T>(url: string) => {
    try {
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
