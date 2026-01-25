import { Body, Controller, Post } from "@nestjs/common";
import { ActorService } from "./actor.service";
import { ActorDto } from "./dto/actor.dto";
import { Actor } from "@prisma/client";

@Controller("actors")
export class ActorController {
	constructor(private readonly actorService: ActorService) {}
	@Post()
	create(@Body() createDto: ActorDto): Promise<Actor> {
		return this.actorService.create(createDto);
	}
}
