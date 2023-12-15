import { HttpException } from "@nestjs/common";

export class UsersError extends HttpException {
    constructor(status: number, message: UsersErrorMessages) {
        super(message, status);
    }
}

export enum UsersErrorMessages {
    User_Not_Created = 'User was not created',
    User_Not_Found = 'User was not found',
}