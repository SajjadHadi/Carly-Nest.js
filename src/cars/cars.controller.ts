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
    Query,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { RawQueryParamsDto } from '../common/dto';
import { imageStorageInterceptor } from '../common/interceptor';
import { QueryParserPipe } from '../common/pipe';
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
    async findAll(@Query() queryParamsDto: RawQueryParamsDto) {
        console.log(queryParamsDto);
        return await this.carsService.findAll(queryParamsDto);
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
