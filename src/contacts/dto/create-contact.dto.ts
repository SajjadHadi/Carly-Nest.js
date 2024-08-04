import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateContactDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    lastName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(255)
    phone?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(255)
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(3000)
    message?: string;
}
