import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto, SignupAuthDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body(ValidationPipe) loginAuthDto: LoginAuthDto) {
        return this.authService.login(loginAuthDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signup(@Body(ValidationPipe) signupDto: SignupAuthDto) {
        return this.authService.signup(signupDto);
    }
}
