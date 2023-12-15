import { BadRequestException, ExecutionContext, createParamDecorator } from "@nestjs/common";

type UserKey = 'user_id' | 'user_name';

export const CurrentUser = createParamDecorator<UserKey, ExecutionContext>((key, context) => {
    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (key) {
        const value = user[key];

        if (!value) {
            throw new BadRequestException(`Missing ${key} in user`);
        }

        return value;
    }

    return user;
})