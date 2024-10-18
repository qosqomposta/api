import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const PORT = configService.get<number>('port');

    const validationPipeOptions: ValidationPipeOptions = {
        whitelist: true,
        transform: true,
    };

    app.useGlobalPipes(
        new ValidationPipe({
            ...validationPipeOptions,
        }),
    );
    app.setGlobalPrefix('api');

    app.enableCors();

    await app.listen(PORT, () => {
        console.log('server is running on ' + PORT);
    });
}
bootstrap();
