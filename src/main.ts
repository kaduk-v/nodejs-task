import { NestFactory } from '@nestjs/core';
import { ConfigService } from "@nestjs/config";
import { AppModule } from '@/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { OpenAPIObject, SwaggerCustomOptions, SwaggerDocumentOptions } from "@nestjs/swagger/dist/interfaces";

const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder().setTitle('API').setDescription('API description').setVersion('1.0').build();
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

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, options);

    await app.listen(appService.get('port'));
}

bootstrap();
