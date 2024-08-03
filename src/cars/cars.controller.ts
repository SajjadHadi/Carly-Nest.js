import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarsService } from './cars.service';
import { FileInterceptor } from '@nestjs/platform-express';
import imageStorageConfig from '../config/imageStorageConfig';

@Controller('cars')
@ApiTags('Cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

    // TODO: Implement filtering
    @Get()
    findAll() {
        return this.carsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.carsService.findOne(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image', imageStorageConfig))
    create(
        @Body(
            new ValidationPipe({
                transform: true,
                transformOptions: { enableImplicitConversion: true },
            }),
        )
        createCarDto: CreateCarDto,
    ) {
        return this.carsService.create(createCarDto);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateCarDto: UpdateCarDto,
    ) {
        return this.carsService.update(id, updateCarDto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.carsService.delete(id);
    }
}
