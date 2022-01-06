import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/entities/user.entity';

@Module({
    imports: [
        PassportModule,
        UsersModule,
        UsersRepository,
        UsersService,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: process.env.JWT_EXPIRY_IN_SECONDS + 's' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, UsersModule]
})
export class AuthModule { }
