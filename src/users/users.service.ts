import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { excludeFieldUtil } from '../common/utils';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getMe(userId: number) {
        return this.databaseService.user.findUnique({
            where: { id: userId },
            select: { hashPassword: false, id: true, username: true, email: true },
        });
    }

    async getMyCars(userId: number, query: any) {
        try {
            return this.databaseService.car.findMany({
                take: query.take,
                skip: query.skip,
                orderBy: query.orderBy,
                where: { ...query.where, userId },
                select: excludeFieldUtil(this.databaseService.car, ['userId']),
            });
        } catch {
            throw new BadRequestException('Bad Request!');
        }
    }

    async saveCar(userId: number, carId: number) {
        try {
            const car = await this.databaseService.car.findUnique({
                where: { id: carId },
            });

            if (!car) {
                throw new NotFoundException('Car not found');
            }

            const user = await this.databaseService.user.update({
                where: { id: userId },
                data: {
                    savedCars: {
                        connect: { id: carId },
                    },
                },
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }
            return { message: 'Car successfully added to the saved cars' };
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Car already saved by this user');
                }
            }
            throw error;
        }
    }

    async getSavedCars(userId: number, query: any) {
        try {
            const cars = await this.databaseService.user.findMany({
                where: { id: userId },
                select: {
                    savedCars: {
                        skip: query.skip,
                        orderBy: query.orderBy,
                        take: query.take,
                        where: { ...query.where },
                        select: excludeFieldUtil(this.databaseService.car, ['userId']),
                    },
                },
            });
            return cars[0].savedCars;
        } catch {
            throw new BadRequestException('Bad Request!');
        }
    }
}
