import configuration from '@/config/configuration';
import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RateController } from "@/rate/rate.controller";
import { RateModule } from "@/rate/rate.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from "@/user/user.module";
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [ configuration ]
        }),
        TypeOrmModule.forRootAsync({
            inject: [ ConfigService ],
            useFactory: (config: ConfigService) => (config.get('database'))
        }),
        ScheduleModule.forRoot(),
        UserModule,
        RateModule,
        AuthModule
    ],
    controllers: [ AppController ],
    providers: [],
})
export class AppModule {
}
