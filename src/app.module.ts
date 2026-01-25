import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ActorModule } from "./actor/actor.module";
import { ReviewModule } from "./review/review.module";
import { MovieModule } from "./movie/movie.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PrismaModule,
		MovieModule,
		ReviewModule,
		ActorModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
