import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class RawQueryParamsDto {
    @IsOptional()
    @IsNumberString()
    page?: string;

    @IsOptional()
    @IsNumberString()
    limit?: string;

    @IsOptional()
    @IsString()
    where?: string;

    @IsOptional()
    @IsString()
    orderBy?: string;
}
