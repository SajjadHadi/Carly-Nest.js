import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetCarDto } from '../cars/dto';
import { RawQueryParamsDto } from '../common/dto';
import { DatabaseService } from '../database/database.service';
import { GetMe } from './dto';

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getMe(userId: number): Promise<GetMe> {
        const me = await this.databaseService.user.findUnique({ where: { id: userId } });
        return plainToInstance(GetMe, me, { excludeExtraneousValues: true });
    }

    async getMyCars(userId: number, query: RawQueryParamsDto): Promise<GetCarDto[]> {
        try {
            const cars = await this.databaseService.car.findMany({ ...query, where: { ...query.where, userId } });
            return plainToInstance(GetCarDto, cars, { excludeExtraneousValues: true });
        } catch {
            throw new BadRequestException('Bad Request!');
        }
    }

    async saveCar(userId: number, carId: number): Promise<{ message: string }> {
        const car = await this.databaseService.car.findUnique({ where: { id: carId } });
        if (!car) throw new NotFoundException('Car not found');

        const savedCarItem = await this.databaseService.savedCarItem.findUnique({
            where: { userId_carId: { userId, carId } },
        });
        if (savedCarItem) throw new NotFoundException('This car is saved by this user, already!');

        await this.databaseService.savedCarItem.create({ data: { userId, carId } });
        return { message: 'Car successfully added to the saved cars' };
    }

    // TODO: UnSave Car

    async getSavedCars(userId: number, query: RawQueryParamsDto): Promise<GetCarDto[]> {
        try {
            const rawCars = await this.databaseService.savedCarItem.findMany({
                take: query.take,
                skip: query.skip,
                where: { userId },
                select: { car: true },
            });
            const cars = rawCars.map((item) => item.car);
            return plainToInstance(GetCarDto, cars, { excludeExtraneousValues: true });
        } catch {
            throw new BadRequestException('Bad Request!');
        }
    }
}
