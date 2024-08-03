import CreateCarDto from './create-car.dto';
import { OmitType } from '@nestjs/swagger';

class UpdateCarDto extends OmitType(CreateCarDto, ['image'] as const) {}

export default UpdateCarDto;
