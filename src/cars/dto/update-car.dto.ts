import { OmitType } from '@nestjs/swagger';
import { CreateCarDto } from './create-car.dto';

export class UpdateCarDto extends OmitType(CreateCarDto, ['image'] as const) {}
