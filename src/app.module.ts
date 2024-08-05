import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CarsModule } from './cars/cars.module';
import { ContactsModule } from './contacts/contacts.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'static', 'images'),
            serveRoot: '/static/images',
        }),
        DatabaseModule,
        CarsModule,
        ContactsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
