import { Injectable, PipeTransform } from '@nestjs/common';
import { RawQueryParamsDto } from '../dto/raw-query-params.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class QueryParserPipe implements PipeTransform {
    async transform(value: RawQueryParamsDto) {
        const { where, orderBy, page, limit } = value;

        const parsedWhere = this.parseWhere(where);
        const parsedOrderBy = this.parseOrderBy(orderBy);
        const parsedSkip = page ? (parseInt(page, 10) - 1) * (parseInt(limit, 10) || 10) : 0;
        const parsedTake = limit ? parseInt(limit, 10) : 10;

        return {
            where: parsedWhere,
            orderBy: parsedOrderBy,
            skip: parsedSkip,
            take: parsedTake,
        };
    }

    private parseWhere(whereString: string | undefined): Prisma.CarWhereInput {
        if (!whereString) return {};
        const wheres = whereString.split(',').map((item) => {
            const [field, value] = item.split(':');
            return { [field]: { contains: value, startsWith: value, endsWith: value } };
        });
        return Object.assign({}, ...wheres);
    }

    private parseOrderBy(orderByString: string | undefined): Record<string, string>[] {
        if (!orderByString) return [];
        const orders = orderByString.split(',').map((item) => {
            const [field, direction = 'asc'] = item.split(':');
            return { [field]: direction };
        });
        return orders;
    }
}
