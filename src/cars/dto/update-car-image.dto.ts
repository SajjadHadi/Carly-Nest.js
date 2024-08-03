import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class UpdateCarImageDto {
    @ApiProperty()
    @IsString({ message: 'Image is required' })
    image: string;
}

export default UpdateCarImageDto;
