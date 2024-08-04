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
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { RawQueryParamsDto } from '../common/dto/raw-query-params.dto';
import { QueryParserPipe } from '../common/pipes/query-parser.pipe';
import imageStorageConfig from '../common/utils/imageStorageConfig';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarImageDto } from './dto/update-car-image.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
@ApiTags('Cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

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

    @Get()
    @UsePipes(QueryParserPipe)
    @ApiQuery({ name: 'where', required: false, description: 'Example: brand:toyota,model:yaris' })
    @ApiQuery({ name: 'orderBy', required: false, description: 'An integer number.' })
    @ApiQuery({ name: 'page', required: false, description: 'An integer number.' })
    @ApiQuery({
        name: 'limit',
        required: false,
        description: 'Example: id,topSpeed:desc,year:asc',
    })
    findAll(@Query() queryParamsDto: RawQueryParamsDto) {
        console.log(queryParamsDto);
        return this.carsService.findAll(queryParamsDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.carsService.findOne(id);
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
