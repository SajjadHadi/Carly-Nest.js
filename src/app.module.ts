import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [CarsModule, DatabaseModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
