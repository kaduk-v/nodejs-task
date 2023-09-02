import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "@/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ ConfigService ],
            useFactory: (config: ConfigService) => ({
                secret: config.get('jwt').secretKey,
                signOptions: {
                    expiresIn: config.get('jwt').expiresIn
                },
            })
        }),
        UserModule,
    ],
    controllers: [ AuthController ],
    providers: [ AuthService ]
})
export class AuthModule {
}
