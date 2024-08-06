import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class SaveCarDTO {
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    carId: number;
}
