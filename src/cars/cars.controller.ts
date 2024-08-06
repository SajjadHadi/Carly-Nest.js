import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Car, User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard, OptionalJwtAuthGuard } from '../auth/guard';
import { ParseQuery } from '../common/decorator';
import { RawQueryParamsDto } from '../common/dto';
import { imageStorageInterceptor } from '../common/interceptor';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto, UpdateCarImageDto } from './dto';
import { CarWithSavedByLabel } from './types';

@Controller('cars')
@ApiTags('Cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

    @UseGuards(JwtGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image', imageStorageInterceptor))
    @ApiConsumes('multipart/form-data')
    async create(@GetUser('id') userId: number, @Body() createCarDto: CreateCarDto): Promise<Partial<Car>> {
        return await this.carsService.create(userId, createCarDto);
    }

    @UseGuards(OptionalJwtAuthGuard)
    @Get()
    async findAll(
        @ParseQuery() queryParamsDto: RawQueryParamsDto,
        @GetUser('id') userId: number | undefined,
    ): Promise<CarWithSavedByLabel[]> {
        return await this.carsService.findAll(queryParamsDto, userId);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Omit<Car, 'userId'>> {
        return await this.carsService.findOne(id);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    async update(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCarDto: UpdateCarDto,
    ): Promise<Partial<Car>> {
        return await this.carsService.update(userId, id, updateCarDto);
    }

    @UseGuards(JwtGuard)
    @Patch(':id/image')
    @UseInterceptors(FileInterceptor('image', imageStorageInterceptor))
    @ApiConsumes('multipart/form-data')
    async updateImage(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCarImageDto: UpdateCarImageDto,
    ): Promise<Omit<Car, 'userId'>> {
        return await this.carsService.updateImage(userId, id, updateCarImageDto);
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async remove(@GetUser('id') userId: number, @Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.carsService.delete(userId, id);
    }
}
