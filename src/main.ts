import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.useGlobalInterceptors(new ResponseInterceptor());
	app.useGlobalFilters(new AllExceptionsFilter());
	const config = new DocumentBuilder()
		.setTitle("Nest Course API")
		.setDescription("API Documentation for Nestjs Course")
		.setVersion("1.0.0")
		.setContact(
			"Phoenixifier",
			"https://github.com/phoenixifier",
			"phoenixbboy@gmail.com",
		)
		.addBearerAuth()
		.build();

	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("/docs", app, documentFactory);

	await app.listen(3000);
}
bootstrap();
