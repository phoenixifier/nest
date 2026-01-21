import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieDto } from "./dto/movie.dto";

@Controller("movies")
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get()
	findAll() {
		return this.movieService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: number) {
		return this.movieService.findById(id);
	}

	@Post()
	create(@Body() dto: MovieDto) {
		return this.movieService.create(dto);
	}

	@Put(":id")
	update(@Param("id") id: number, @Body() dto: MovieDto) {
		return this.movieService.update(id, dto);
	}

	@Delete(":id")
	delete(@Param("id") id: number) {
		return this.movieService.delete(id);
	}
}
