import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());


  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder().setTitle('Papyrus Assessment').setDescription('Papyrus Assessment API DOCS').setVersion('1.0').addTag('API').addBearerAuth(
    {
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'Token',
    },
    'token',
  )
  .addSecurityRequirements('token').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      pathPrefix: 'v1', // Add this line to set the prefix
    },
  });


  app.enableCors({
    // true for all origins
    origin: true,
  });

  
  await app.listen(3000);
}
bootstrap();
