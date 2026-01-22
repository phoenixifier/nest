import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ActorEntity } from "./entities/actor.entity";
import { MovieService } from "../movie/movie.service";
import { ActorDto } from "./dto/actor.dto";
import { Repository } from "typeorm";

@Injectable()
export class ActorService {
	constructor(
		@InjectRepository(ActorEntity)
		private readonly actorRepository: Repository<ActorEntity>,
		private readonly movieService: MovieService,
	) {}

	async create(dto: ActorDto): Promise<ActorEntity> {
		const { name } = dto;
		const actors = this.actorRepository.create({ name });
		return await this.actorRepository.save(actors);
	}
}
