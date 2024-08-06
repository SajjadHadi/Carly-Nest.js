import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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

    async getMyCars(userId: number) {
        return this.databaseService.car.findMany({ where: { userId } });
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

    async getSavedCars(userId: number) {
        return this.databaseService.user
            .findUnique({
                where: { id: userId },
                select: {
                    savedCars: true,
                },
            })
            .savedCars();
    }
}
