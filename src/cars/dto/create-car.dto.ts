import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';
import { CarConditionEnum, CarFuelEnum, CarTransmissionEnum, CarTypeEnum } from '../enums';

export class CreateCarDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    @Expose()
    model: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    @Expose()
    brand: string;

    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(9999999)
    @Expose()
    price: number;

    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(9999999)
    @Expose()
    discountedPrice: number;

    @ApiProperty()
    @IsInt()
    @Min(1900)
    @Max(2100)
    @Expose()
    manufactureYear: number;

    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(512)
    @Expose()
    topSpeed: number;

    @ApiProperty()
    @IsEnum(CarTypeEnum)
    @Expose()
    type: CarTypeEnum;

    @ApiProperty()
    @IsEnum(CarTransmissionEnum)
    @Expose()
    transmission: CarTransmissionEnum;

    @ApiProperty()
    @IsEnum(CarConditionEnum)
    @Expose()
    condition: CarConditionEnum;

    @ApiProperty()
    @IsEnum(CarFuelEnum)
    @Expose()
    fuel: CarFuelEnum;

    @ApiProperty()
    @IsString()
    @MaxLength(3000)
    @Expose()
    description: string;

    @ApiProperty()
    @IsString({ message: 'Image is required' })
    @Expose()
    image: string;
}
