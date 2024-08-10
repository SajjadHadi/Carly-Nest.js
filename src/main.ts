import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: /^http:\/\/localhost:\d+$/,   
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, 
      });

    const config = new DocumentBuilder()
        .setTitle('Carly')
        .setDescription('The Carly API description')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    await app.listen(8000);
}

bootstrap();
