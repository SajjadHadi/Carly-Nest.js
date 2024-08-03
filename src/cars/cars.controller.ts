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
    Query,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import CreateCarDto from './dto/create-car.dto';
import UpdateCarDto from './dto/update-car.dto';
import { CarsService } from './cars.service';
import { FileInterceptor } from '@nestjs/platform-express';
import imageStorageConfig from '../common/utils/imageStorageConfig';
import UpdateCarImageDto from './dto/update-car-image.dto';
import RawQueryParamsDto from '../common/dto/raw-query-params.dto';
import { QueryParserPipe } from '../common/pipes/query-parser.pipe';

@Controller('cars')
@ApiTags('Cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

    @Get()
    @UsePipes(QueryParserPipe)
    findAll(@Query() queryParamsDto: RawQueryParamsDto) {
        return this.carsService.findAll(queryParamsDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.carsService.findOne(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image', imageStorageConfig))
    @ApiConsumes('multipart/form-data')
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
        @Body(new ValidationPipe({ transform: true, whitelist: true })) updateCarDto: UpdateCarDto,
    ) {
        return this.carsService.update(id, updateCarDto);
    }

    @Put(':id/image')
    @UseInterceptors(FileInterceptor('image', imageStorageConfig))
    @ApiConsumes('multipart/form-data')
    updateImage(
        @Param('id', ParseIntPipe) id: number,
        @Body(new ValidationPipe({ transform: true, whitelist: true }))
        updateCarImageDto: UpdateCarImageDto,
    ) {
        return this.carsService.updateImage(id, updateCarImageDto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.carsService.delete(id);
    }
}
