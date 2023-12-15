import { http } from "~/libs/http.lib";
import { ApiResponse } from "../types/types.api";
import { generateApiError } from "../utils/api.util";
import { LoginDto, LoginResponse, RegisterDto, RegisterResponse } from "./auth.types";

export const authApi = {
    login: async (data: LoginDto): Promise<ApiResponse<LoginResponse>> => {
        try {
            const response = await http.post('/auth/login', data);

            return {
                code: response.status,
                ok: true,
                data: response.data,
            };
        } catch (error) {
            return generateApiError(error);
        }
    },
    register: async (data: RegisterDto): Promise<ApiResponse<RegisterResponse>> => {
        try {
            const response = await http.post('/auth/register', data);

            return {
                code: response.status,
                ok: true,
                data: response.data,
            };
        } catch (error) {
            return generateApiError(error);
        }
    }
}
