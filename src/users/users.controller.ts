import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { SaveCarDTO } from './dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('me')
    async getMe(@GetUser('id') userId: number) {
        return await this.usersService.getMe(userId);
    }

    @Get('/my-cars')
    async getMyCars(@GetUser('id') userId: number) {
        return this.usersService.getMyCars(userId);
    }

    @Post('/save-car')
    async saveCar(@GetUser('id') userId: number, @Body(ValidationPipe) { carId }: SaveCarDTO) {
        return await this.usersService.saveCar(userId, carId);
    }

    @Get('/get-saved-cars')
    async getSavedCars(@GetUser('id') userId: number) {
        return this.usersService.getSavedCars(userId);
    }
}
