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
    ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator';
import { JwtGuard, OptionalJwtAuthGuard } from '../auth/guard';
import { ParseQuery } from '../common/decorator';
import { RawQueryParamsDto } from '../common/dto';
import { imageStorageInterceptor } from '../common/interceptor';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto, UpdateCarImageDto } from './dto';

@Controller('cars')
@ApiTags('Cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

    @UseGuards(JwtGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image', imageStorageInterceptor))
    @ApiConsumes('multipart/form-data')
    async create(
        @GetUser('id') userId: number,
        @Body(
            new ValidationPipe({
                transform: true,
                transformOptions: { enableImplicitConversion: true },
            }),
        )
        createCarDto: CreateCarDto,
    ) {
        return await this.carsService.create(userId, createCarDto);
    }

    @UseGuards(OptionalJwtAuthGuard)
    @Get()
    async findAll(
        @ParseQuery() queryParamsDto: RawQueryParamsDto,
        @GetUser() user: any | undefined,
    ) {
        return await this.carsService.findAll(queryParamsDto, user);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await this.carsService.findOne(id);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    async update(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ transform: true, whitelist: true })) updateCarDto: UpdateCarDto,
    ) {
        return await this.carsService.update(userId, id, updateCarDto);
    }

    @UseGuards(JwtGuard)
    @Patch(':id/image')
    @UseInterceptors(FileInterceptor('image', imageStorageInterceptor))
    @ApiConsumes('multipart/form-data')
    async updateImage(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ transform: true, whitelist: true }))
        updateCarImageDto: UpdateCarImageDto,
    ) {
        return await this.carsService.updateImage(userId, id, updateCarImageDto);
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async remove(@GetUser('id') userId: number, @Param('id', ParseIntPipe) id: number) {
        return await this.carsService.delete(userId, id);
    }
}
