import {
    CarConditionEnum,
    CarFuelEnum,
    CarTransmissionEnum,
    CarTypeEnum,
} from '../enums';
import {
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsString,
    Max,
    MaxLength,
    Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    model: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    brand: string;

    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(9999999)
    price: number;

    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(9999999)
    discountedPrice: number;

    @ApiProperty()
    @IsInt()
    @Min(1900)
    @Max(2100)
    manufactureYear: number;

    @ApiProperty()
    @IsInt()
    @Min(0)
    @Max(512)
    topSpeed: number;

    @ApiProperty()
    @IsEnum(CarTypeEnum)
    type: CarTypeEnum;

    @ApiProperty()
    @IsEnum(CarTransmissionEnum)
    transmission: CarTransmissionEnum;

    @ApiProperty()
    @IsEnum(CarConditionEnum)
    condition: CarConditionEnum;

    @ApiProperty()
    @IsEnum(CarFuelEnum)
    fuel: CarFuelEnum;

    @ApiProperty()
    @IsString()
    @MaxLength(3000)
    description: string;

    @ApiProperty()
    @IsString({ message: 'Image is required' })
    image: string;
}
