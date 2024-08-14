import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext): User | number | string | undefined => {
        const request = ctx.switchToHttp().getRequest();

        if (!request.user) {
            return undefined;
        }
        if (data) {
            return request.user[data];
        }
        return request.user;
    },
);
