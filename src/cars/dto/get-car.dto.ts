import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsDate, IsInt, IsOptional, Min } from 'class-validator';
import { CreateCarDto } from './create-car.dto';

export class GetCarDto extends CreateCarDto {
    @ApiProperty()
    @IsInt()
    @Min(0)
    @Expose()
    id: number;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    @Expose()
    savedBy?: boolean;

    @ApiProperty()
    @IsDate()
    @Expose()
    createdAt: Date;
}
