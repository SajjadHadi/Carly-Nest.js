import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'static', 'images'),
            serveRoot: '/static/images',
        }),
        CarsModule,
        DatabaseModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
