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
        const prismaUpdateUserDto: Prisma.CarUpdateInput = { ...updateCarDto };
        const user = await this.databaseService.car.update({
            where: { id },
            data: prismaUpdateUserDto,
        });
        if (!user) {
            throw new NotFoundException(`Car with id ${id} not found`);
        }
        return user;
    }

    async delete(id: number) {
        return this.databaseService.car.delete({ where: { id } });
    }
}
