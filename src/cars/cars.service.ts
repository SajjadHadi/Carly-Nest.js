import { Injectable, NotFoundException } from '@nestjs/common';
import UpdateCarDto from './dto/update-car.dto';
import CreateCarDto from './dto/create-car.dto';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';
import UpdateCarImageDto from './dto/update-car-image.dto';

// import RawQueryParamsDto from '../common/dto/raw-query-params.dto';

@Injectable()
export class CarsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async findAll(queryParamsDto: any) {
        try {
            return this.databaseService.car.findMany({ ...queryParamsDto });
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

    async create(createCarDto: CreateCarDto) {
        return this.databaseService.car.create({
            data: createCarDto,
        });
    }

    async update(id: number, updateCarDto: UpdateCarDto) {
        try {
            return this.databaseService.car.update({
                where: { id },
                data: updateCarDto,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`Car with ID ${id} not found`);
            }
            throw error;
        }
    }

    async updateImage(id: number, updateCarImageDto: UpdateCarImageDto) {
        try {
            return this.databaseService.car.update({
                where: { id },
                data: updateCarImageDto,
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`Car with ID ${id} not found`);
            }
            throw error;
        }
    }

    async delete(id: number) {
        try {
            await this.databaseService.car.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`Car with ID ${id} not found`);
            }
            throw error;
        }
    }
}
