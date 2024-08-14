import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class GetMe {
    @ApiProperty()
    @IsInt()
    @Expose()
    id: number;

    @ApiProperty()
    @IsString()
    @Expose()
    username: string;

    @ApiProperty()
    @IsEmail()
    @Expose()
    email: string;
}
