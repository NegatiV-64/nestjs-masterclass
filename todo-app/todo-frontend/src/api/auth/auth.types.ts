export interface LoginDto {
    name: string;
    password: string;
}

export interface LoginResponse {
    auth_token: string;
}


export type RegisterDto = LoginDto;
export type RegisterResponse = {
    user_id: string;
    user_name: string;
};