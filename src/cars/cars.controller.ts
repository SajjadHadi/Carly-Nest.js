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
import { GetUser } from '../auth/decorator';
import { JwtGuard, OptionalJwtAuthGuard } from '../auth/guard';
import { ParseQuery } from '../common/decorator';
import { RawQueryParamsDto } from '../common/dto';
import { imageStorageInterceptor } from '../common/interceptor';
import { CarsService } from './cars.service';
import { CreateCarDto, GetCarDto, UpdateCarDto, UpdateCarImageDto } from './dto';

@Controller('cars')
@ApiTags('Cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

    @UseGuards(OptionalJwtAuthGuard)
    @Get()
    findAll(
        @ParseQuery() queryParamsDto: RawQueryParamsDto,
        @GetUser('id') userId: number | undefined,
    ): Promise<GetCarDto[]> {
        return this.carsService.findAll(queryParamsDto, userId);
    }

    @UseGuards(JwtGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image', imageStorageInterceptor))
    @ApiConsumes('multipart/form-data')
    create(@GetUser('id') userId: number, @Body() createCarDto: CreateCarDto): Promise<GetCarDto> {
        return this.carsService.create(userId, createCarDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<GetCarDto> {
        return this.carsService.findOne(id);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    update(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCarDto: UpdateCarDto,
    ): Promise<GetCarDto> {
        return this.carsService.update(userId, id, updateCarDto);
    }

    @UseGuards(JwtGuard)
    @Patch(':id/image')
    @UseInterceptors(FileInterceptor('image', imageStorageInterceptor))
    @ApiConsumes('multipart/form-data')
    updateImage(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCarImageDto: UpdateCarImageDto,
    ): Promise<GetCarDto> {
        return this.carsService.updateImage(userId, id, updateCarImageDto);
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    remove(@GetUser('id') userId: number, @Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.carsService.delete(userId, id);
    }
}
