import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ActorModule } from "./actor/actor.module";
import { ReviewModule } from "./review/review.module";
import { MovieModule } from "./movie/movie.module";
import { getTypeOrmConfig } from "../config/typeorm.config";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getTypeOrmConfig,
			inject: [ConfigService],
		}),
		PrismaModule,
		MovieModule,
		ReviewModule,
		ActorModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
