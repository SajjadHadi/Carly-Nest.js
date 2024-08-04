import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

@Module({
    imports: [DatabaseModule],
    controllers: [ContactsController],
    providers: [ContactsService],
})
export class ContactsModule {}
