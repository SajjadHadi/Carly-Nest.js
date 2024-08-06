import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { hash, verify } from 'argon2';
import { DatabaseService } from '../database/database.service';
import { LoginAuthDto, SignupAuthDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly jwt: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async login(loginAuthDto: LoginAuthDto) {
        const user = await this.databaseService.user.findUnique({
            where: { email: loginAuthDto.email },
        });
        if (!user) {
            throw new ForbiddenException('Credentials are wrong!');
        }
        const isMatch = await verify(user.hashPassword, loginAuthDto.password);
        if (!isMatch) {
            throw new ForbiddenException('Credentials are wrong!');
        }
        const token = await this.signToken(user.id, user.email);
        delete user.hashPassword;
        return { token, ...user };
    }

    async signup(signupAuthDto: SignupAuthDto) {
        const hashPassword = await hash(signupAuthDto.password);
        const processedUser = { ...signupAuthDto, hashPassword };
        delete processedUser.password;

        try {
            const user = await this.databaseService.user.create({
                data: processedUser,
            });
            const token = await this.signToken(user.id, user.email);
            delete user.hashPassword;
            return { token, ...user };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('A user with this credentials exits already.');
            }
            throw error;
        }
    }

    private async signToken(id: number, email: string) {
        const payload = { id, email };
        const secret = this.configService.get('JWT_SECRET');
        return await this.jwt.signAsync(payload, { secret, expiresIn: '7d' });
    }
}
