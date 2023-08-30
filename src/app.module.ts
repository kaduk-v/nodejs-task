import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config/configuration';

@Module({
    imports: [ ConfigModule.forRoot({
        isGlobal: true,
        load: [configuration]
    }) ],

    controllers: [ AppController ],
    providers: [],
})
export class AppModule {
}
