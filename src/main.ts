import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module.js";
import { setupAdminJS } from "./admin/admin.setup.js";
import { NestExpressApplication } from "@nestjs/platform-express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { PreconditionFailedException, ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";

function getStaticRootPath() {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  if (process.env.NODE_ENV === "production") {
    return join(__dirname, "public");
  }
  return join(__dirname, "..", "public");
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new PreconditionFailedException(
          validationErrors.map((error) => {
            return {
              field: error.property,
              error: error.constraints && Object.values(error.constraints)[0],
            };
          })
        );
      },
    })
  );

  await setupAdminJS(app);

  app.useStaticAssets(getStaticRootPath());

  app.setGlobalPrefix("/api/v1");

  const config = new DocumentBuilder()
    .setTitle("Swagger Docs")
    .setDescription("Apis")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  app.enableCors();

  const port = process.env.PORT ?? 3000;
  await app.listen(port, () => {
    console.log(
      `Server is starting on ${process.env.APP_URL}/api/v1 at ${new Date()} with process id: ${process.pid}`
    );
  });
}
bootstrap();
