import configuration from '@/config/configuration';
import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { ConfigModule } from '@nestjs/config';
import { RateController } from "@/rate/rate.controller";
import { RateModule } from "@/rate/rate.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [ configuration ]
        }),
        RateModule
    ],
    controllers: [ AppController ],
    providers: [],
})
export class AppModule {
}
