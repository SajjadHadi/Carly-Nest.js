import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from '@prisma/client';
import { RawQueryParamsDto } from '../common/dto';
import { assignSavedByLabel, omitKeys } from '../common/utils';
import { DatabaseService } from '../database/database.service';
import { CreateCarDto, UpdateCarDto, UpdateCarImageDto } from './dto';
import { CarWithSavedByLabel } from './types';

@Injectable()
export class CarsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async findAll(queryParamsDto: RawQueryParamsDto, userId?: number): Promise<CarWithSavedByLabel[]> {
        try {
            const cars = await this.databaseService.car.findMany({
                include: { savedBy: true },
                ...queryParamsDto,
            });
            return assignSavedByLabel(cars, userId);
        } catch {
            return [];
        }
    }

    async findOne(id: number): Promise<Omit<Car, 'userId'>> {
        const car = await this.databaseService.car.findUnique({ where: { id } });
        if (!car) {
            throw new NotFoundException(`Car with id ${id} not found`);
        }
        return omitKeys(car, ['userId']);
    }

    async create(userId: number, createCarDto: CreateCarDto): Promise<Omit<Car, 'userId'>> {
        const car = await this.databaseService.car.create({
            data: {
                createdBy: {
                    connect: { id: userId },
                },
                ...createCarDto,
            },
        });
        return omitKeys(car, ['userId']);
    }

    async update(userId: number, id: number, updateCarDto: UpdateCarDto): Promise<Omit<Car, 'userId'>> {
        const car = await this.databaseService.car.findUnique({ where: { id } });

        if (!car || car.userId !== userId) {
            throw new ForbiddenException(`Access to resource denied.`);
        }
        const updatedCar = await this.databaseService.car.update({
            where: { id },
            data: updateCarDto,
        });
        return omitKeys(updatedCar, ['userId']);
    }

    async updateImage(userId: number, id: number, updateCarImageDto: UpdateCarImageDto): Promise<Omit<Car, 'userId'>> {
        const car = await this.databaseService.car.findUnique({ where: { id } });

        if (!car || car.userId !== userId) {
            throw new ForbiddenException(`Access to resource denied.`);
        }
        const updatedCar = await this.databaseService.car.update({
            where: { id },
            data: updateCarImageDto,
        });
        return omitKeys(updatedCar, ['userId']);
    }

    async delete(userId: number, id: number): Promise<void> {
        const car = await this.databaseService.car.findUnique({ where: { id } });

        if (!car || car.userId !== userId) {
            throw new ForbiddenException(`Access to resource denied.`);
        }
        await this.databaseService.car.delete({ where: { id } });
        return;
    }
}
