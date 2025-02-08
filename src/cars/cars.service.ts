import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RawQueryParamsDto } from '../common/dto';
import { assignSavedByLabel } from '../common/utils';
import { DatabaseService } from '../database/database.service';
import { CreateCarDto, GetCarDto, UpdateCarDto, UpdateCarImageDto } from './dto';

@Injectable()
export class CarsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async findAll(queryParamsDto: RawQueryParamsDto, userId?: number): Promise<GetCarDto[]> {
        try {
            const cars = await this.databaseService.car.findMany({
                include: { savedBy: true },
                ...queryParamsDto,
            });
            return plainToInstance(GetCarDto, assignSavedByLabel(cars, userId), { excludeExtraneousValues: true });
        } catch {
            return [];
        }
    }

    async create(userId: number, createCarDto: CreateCarDto): Promise<GetCarDto> {
        const car = await this.databaseService.car.create({
            data: {
                createdBy: {
                    connect: { id: userId },
                },
                ...createCarDto,
            },
        });
        return plainToInstance(GetCarDto, car, { excludeExtraneousValues: true });
    }

    async findOne(id: number): Promise<GetCarDto> {
        const car = await this.databaseService.car.findUnique({ where: { id } });
        if (!car) throw new NotFoundException(`Car with id ${id} not found`);
        return plainToInstance(GetCarDto, car, { excludeExtraneousValues: true });
    }

    async update(userId: number, id: number, updateCarDto: UpdateCarDto): Promise<GetCarDto> {
        // TODO: Make this part reusable
        const car = await this.databaseService.car.findUnique({ where: { id } });
        if (!car || car.userId !== userId) throw new ForbiddenException(`Access to resource denied.`);

        const updatedCar = await this.databaseService.car.update({
            where: { id },
            data: updateCarDto,
        });
        return plainToInstance(GetCarDto, updatedCar, { excludeExtraneousValues: true });
    }

    async updateImage(userId: number, id: number, updateCarImageDto: UpdateCarImageDto): Promise<GetCarDto> {
        const car = await this.databaseService.car.findUnique({ where: { id } });
        if (!car || car.userId !== userId) throw new ForbiddenException(`Access to resource denied.`);

        const updatedCar = await this.databaseService.car.update({
            where: { id },
            data: updateCarImageDto,
        });
        return plainToInstance(GetCarDto, updatedCar, { excludeExtraneousValues: true });
    }

    async delete(userId: number, id: number): Promise<void> {
        const car = await this.databaseService.car.findUnique({ where: { id } });
        if (!car || car.userId !== userId) throw new ForbiddenException(`Access to resource denied.`);
        await this.databaseService.car.delete({ where: { id } });
        return;
    }
}
