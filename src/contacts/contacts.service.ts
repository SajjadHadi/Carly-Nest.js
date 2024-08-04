import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ContactsService {
    constructor(private readonly databaseService: DatabaseService) {}

    async create(createContactDto: Prisma.ContactCreateInput) {
        return this.databaseService.contact.create({ data: createContactDto });
    }

    async findAll() {
        return this.databaseService.contact.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: number) {
        const contact = await this.databaseService.contact.findUnique({
            where: { id },
        });
        if (!contact) {
            throw new NotFoundException(`Contact with id ${id} not found`);
        }
        return contact;
    }

    async remove(id: number) {
        try {
            await this.databaseService.contact.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(`Contact with ID ${id} not found`);
            }
            throw error;
        }
    }
}
