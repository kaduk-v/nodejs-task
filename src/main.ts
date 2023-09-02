import { NestFactory } from '@nestjs/core';
import { ConfigService } from "@nestjs/config";
import { AppModule } from '@/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { OpenAPIObject, SwaggerCustomOptions, SwaggerDocumentOptions } from "@nestjs/swagger/dist/interfaces";
import { ValidationPipe } from "@nestjs/common";

const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API')
    .setDescription('App which fetches and stores the symbol prices from Binance API')
    .setVersion('1.0')
    .build();

const options: SwaggerCustomOptions = {
    swaggerOptions: {
        apisSorter: 'alpha',
        operationsSorter: 'method',
        tagsSorter: 'alpha',
    }
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const appService = app.get(ConfigService);

    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/swagger', app, document, options);


    await app.listen(appService.get('port'));
}

bootstrap();
