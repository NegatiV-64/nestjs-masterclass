export interface SuccessResponse<T> {
    ok: true;
    data: T;
    code: number;
    error?: never;
}

export interface ErrorResponse<T = unknown> {
    ok: false;
    data?: never;
    code: number;
    error: T;
}

export type ApiResponse<T = unknown, E = unknown> = | SuccessResponse<T> | ErrorResponse<E>;