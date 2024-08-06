import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { RawQueryParamsDto } from '../common/dto';
import { excludeFieldUtil } from '../common/utils';
import { DatabaseService } from '../database/database.service';
import { CreateCarDto, UpdateCarDto, UpdateCarImageDto } from './dto';

// import { RawQueryParamsDto } from '../common/dto';

@Injectable()
export class CarsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async findAll(queryParamsDto: RawQueryParamsDto, user?: any) {
        try {
            const allItems = await this.databaseService.car.findMany({
                include: { savedBy: true },
                ...queryParamsDto,
            });

            return allItems.map((item) => {
                const isSaved = user?.id
                    ? item.savedBy.some((savedUser) => savedUser.id == user.id)
                    : false;

                return { ...item, savedBy: isSaved };
            });
        } catch (error) {
            console.error('Error in findAll:', error);
            return [];
        }
    }

    async findOne(id: number) {
        const car = await this.databaseService.car.findUnique({
            where: { id },
            select: excludeFieldUtil(this.databaseService.car, ['userId']),
        });
        if (!car) {
            throw new NotFoundException(`Car with id ${id} not found`);
        }
        return car;
    }

    async create(userId: number, createCarDto: CreateCarDto) {
        return this.databaseService.car.create({
            data: {
                createdBy: {
                    connect: { id: userId },
                },
                ...createCarDto,
            },
            select: excludeFieldUtil(this.databaseService.car, ['userId']),
        });
    }

    async update(userId: number, id: number, updateCarDto: UpdateCarDto) {
        const car = await this.databaseService.car.findUnique({ where: { id } });

        if (!car || car.userId !== userId) {
            throw new ForbiddenException(`Access to resource denied.`);
        }
        return this.databaseService.car.update({
            where: { id },
            data: updateCarDto,
            select: excludeFieldUtil(this.databaseService.car, ['userId']),
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
            select: excludeFieldUtil(this.databaseService.car, ['userId']),
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
