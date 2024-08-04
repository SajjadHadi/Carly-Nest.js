import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
    imports: [DatabaseModule],
    controllers: [CarsController],
    providers: [CarsService],
})
export class CarsModule {}
