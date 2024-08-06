import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto';

@Controller('contacts')
@ApiTags('Contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) {}

    @Post()
    create(@Body(ValidationPipe) createContactDto: CreateContactDto) {
        return this.contactsService.create(createContactDto as Prisma.ContactCreateInput);
    }

    @Get()
    findAll() {
        return this.contactsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.contactsService.findOne(+id);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.contactsService.remove(+id);
    }
}
