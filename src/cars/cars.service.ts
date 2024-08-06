import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateCarDto, UpdateCarDto, UpdateCarImageDto } from './dto';

// import { RawQueryParamsDto } from '../common/dto';

@Injectable()
export class CarsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async findAll(queryParamsDto: any) {
        try {
            return await this.databaseService.car.findMany({ ...queryParamsDto });
        } catch {
            return [];
        }
    }

    async findOne(id: number) {
        const car = await this.databaseService.car.findUnique({
            where: { id },
        });
        if (!car) {
            throw new NotFoundException(`Car with id ${id} not found`);
        }
        return car;
    }

    async create(userId: number, createCarDto: CreateCarDto) {
        const car = await this.databaseService.car.create({
            data: {
                createdBy: {
                    connect: { id: userId },
                },
                ...createCarDto,
            },
        });
        delete car.userId;
        return car;
    }

    async update(userId: number, id: number, updateCarDto: UpdateCarDto) {
        const car = await this.databaseService.car.findUnique({ where: { id } });

        if (!car || car.userId !== userId) {
            throw new ForbiddenException(`Access to resource denied.`);
        }
        return this.databaseService.car.update({
            where: { id },
            data: updateCarDto,
        });
    }

    async updateImage(userId: number, id: number, updateCarImageDto: UpdateCarImageDto) {
        const car = await this.databaseService.car.findUnique({ where: { id } });

        if (!car || car.userId !== userId) {
            throw new ForbiddenException(`Access to resource denied.`);
        }
        return this.databaseService.car.update({
            where: { id },
            data: updateCarImageDto,
        });
    }

    async delete(userId: number, id: number) {
        const car = await this.databaseService.car.findUnique({ where: { id } });

        if (!car || car.userId !== userId) {
            throw new ForbiddenException(`Access to resource denied.`);
        }
        return this.databaseService.car.delete({ where: { id } });
    }
}
