import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { validationConfig } from './shared/config/validation.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const consoleLogger = new ConsoleLogger('', {
    timestamp: true,
  });

  const app = await NestFactory.create(AppModule, {
    logger: consoleLogger,
  });

  app.useGlobalPipes(new ValidationPipe(validationConfig));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 8080;

  await app.listen(port, () => {
    consoleLogger.log(`🚀 Server is running: http://localhost:${port}`);
  });
}
bootstrap();
