import { CreateCarDto } from './create-car.dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateCarDto extends OmitType(CreateCarDto, ['image'] as const) {}
