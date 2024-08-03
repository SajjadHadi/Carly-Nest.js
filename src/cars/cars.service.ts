import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCarDto } from './dto/update-car.dto';
import { CreateCarDto } from './dto/create-car.dto';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CarsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async findAll() {
        return this.databaseService.car.findMany();
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
        const prismaCreateCarDto: Prisma.CarCreateInput = { ...createCarDto };
        const car = await this.databaseService.car.create({
            data: prismaCreateCarDto,
        });
        return car;
    }

    async update(id: number, updateCarDto: UpdateCarDto) {
        const prismaUpdateCarDto: Prisma.CarUpdateInput = { ...updateCarDto };
        const car = await this.databaseService.car.update({
            where: { id },
            data: prismaUpdateCarDto,
        });
        if (!car) {
            throw new NotFoundException(`Car with id ${id} not found`);
        }
        return car;
    }

    async delete(id: number) {
        try {
            await this.databaseService.car.delete({
                where: { id },
            });
            return;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException(`Car with ID ${id} not found`);
                }
            }
            throw error;
        }
    }
}
