import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieEntity } from "./entities/movie.entity";
import { In, Repository } from "typeorm";
import { MovieDto } from "./dto/movie.dto";
import { ActorEntity } from "../actor/entities/actor.entity";
import { MoviePosterEntity } from "./entities/poster.entity";

@Injectable()
export class MovieService {
	constructor(
		@InjectRepository(MovieEntity)
		private readonly movieRepository: Repository<MovieEntity>,
		@InjectRepository(ActorEntity)
		private readonly actorRepository: Repository<ActorEntity>,
		@InjectRepository(MoviePosterEntity)
		private readonly posterRepository: Repository<MoviePosterEntity>,
	) {}

	async findAll(): Promise<MovieEntity[]> {
		return await this.movieRepository.find({
			order: { createdAt: "DESC" },
			select: { id: true, title: true },
		});
	}

	async findById(id: string): Promise<MovieEntity> {
		const movie = await this.movieRepository.findOne({
			where: { id },
			relations: ["actors"],
		});

		if (!movie) {
			throw new NotFoundException("Movie not found");
		}

		return movie;
	}

	async create(dto: MovieDto): Promise<MovieEntity> {
		const { title, releaseYear, actorIds, imageUrl } = dto;
		const actors = await this.actorRepository.find({
			where: { id: In(actorIds) },
		});

		if (!actors || !actors.length) {
			throw new NotFoundException("One or more actors not found");
		}

		let poster: MoviePosterEntity | null = null;
		if (imageUrl) {
			poster = this.posterRepository.create({ imageUrl });
			await this.posterRepository.save(poster);
		}
		const movie = this.movieRepository.create({
			title,
			releaseYear,
			poster,
			actors,
		});

		return await this.movieRepository.save(movie);
	}

	async update(id: string, dto: MovieDto): Promise<MovieEntity> {
		const movie = await this.findById(id);
		Object.assign(movie, dto);

		return await this.movieRepository.save(movie);
	}

	async delete(id: string): Promise<string> {
		const movie = await this.findById(id);
		await this.movieRepository.remove(movie);

		return movie.id;
	}
}
