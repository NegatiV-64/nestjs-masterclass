import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse, SuccessResponse } from "~/api/types/types.api";
import { createUrlParams } from "~/utils/params.util";

export const generateApiSuccess = <T>(response: AxiosResponse<T>): SuccessResponse<T> => {
    return {
        code: response.status,
        data: response.data,
        ok: true,
    }
}

export const generateApiError = (error: unknown): ErrorResponse => {
    let errorCode = 500;
    let errorMessage = 'Unknown error';

    if (error instanceof AxiosError) {
        errorCode = error.response?.status ?? errorCode;
        errorMessage = error.response?.data?.message ?? errorMessage;
    }

    return {
        ok: false,
        code: errorCode,
        error: errorMessage,
    };
}

export const createApiUrl = (
    path: string,
    params: Record<string, unknown> = {}
): string => {
    const urlParams = createUrlParams(new URLSearchParams(), params)

    const url = urlParams.toString().length > 0 ? `${path}?${urlParams}` : path;

    return url
}