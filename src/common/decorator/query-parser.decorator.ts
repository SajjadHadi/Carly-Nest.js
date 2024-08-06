import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const ParseQuery = createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { where, orderBy, page, limit } = request.query; // Get query params directly

    const parsedWhere = parseWhere(where);
    const parsedOrderBy = parseOrderBy(orderBy);
    const parsedSkip = page ? (parseInt(page, 10) - 1) * (parseInt(limit, 10) || 10) : 0;
    const parsedTake = limit ? parseInt(limit, 10) : 10;

    return {
        ...(Object.keys(parsedWhere).length > 0 && { where: parsedWhere }),
        ...(parsedOrderBy.length > 0 && { orderBy: parsedOrderBy }),
        skip: parsedSkip,
        take: parsedTake,
    };
});

// TODO: fix the conflict between boolean and number in conversion
// TODO: support le, ge, etc operations in numeric fields
function parseWhere(whereString: string | undefined): Prisma.CarWhereInput {
    if (!whereString) return {};
    const wheres = whereString.split(',').map((item) => {
        const [field, value] = item.split(':');
        if (!isNaN(Number(value))) {
            return { [field]: { equals: Number(value) } };
        }
        return { [field]: { contains: value, startsWith: value, endsWith: value } };
    });
    return Object.assign({}, ...wheres);
}

function parseOrderBy(orderByString: string | undefined): Record<string, string>[] {
    if (!orderByString) return [];
    return orderByString.split(',').map((item) => {
        const [field, direction = 'asc'] = item.split(':');
        return { [field]: direction };
    });
}
