import configuration from '@/config/configuration';
import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RateController } from "@/rate/rate.controller";
import { RateModule } from "@/rate/rate.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from "@/user/user.module";

const configService: ConfigService = new ConfigService(configuration());

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [ configuration ]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ ConfigModule ],
            inject: [ ConfigService ],
            useFactory: (configService: ConfigService) => (configService.get('database'))
        }),
        UserModule,
        RateModule
    ],
    controllers: [ AppController ],
    providers: [],
})
export class AppModule {
}
