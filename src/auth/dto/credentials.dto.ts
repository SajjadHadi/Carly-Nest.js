import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CredentialsDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(255)
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(255)
    // @MinLength(8)
    // @IsAlphanumeric()
    password: string;
}
