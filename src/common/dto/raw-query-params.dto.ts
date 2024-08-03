import { IsNumberString, IsOptional, IsString } from 'class-validator';

class RawQueryParamsDto {
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

export default RawQueryParamsDto;
