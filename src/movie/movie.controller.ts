import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
} from "@nestjs/common";
import { MovieService } from "./movie.service";
import { MovieDto } from "./dto/movie.dto";
import {
	ApiBody,
	ApiHeader,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiResponse,
	ApiTags,
} from "@nestjs/swagger";

@ApiTags("Movies")
@Controller("movies")
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@ApiOperation({
		summary: "Movies List",
		description: "Get a list of movies",
	})
	@ApiResponse({ status: HttpStatus.OK, description: "Movies are found" })
	@Get()
	findAll() {
		return this.movieService.findAll();
	}

	@ApiOperation({
		summary: "Get movie by ID",
		description: "Returns a movie by ID",
	})
	@ApiParam({ name: "id", type: "string", description: "movie ID" })
	@ApiResponse({ status: HttpStatus.OK, description: "The movie is found" })
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: "The movie is not found",
	})
	@Get(":id")
	findOne(
		@Param("id") id: string,
		@Query("page") page: number,
		@Query("limit") limit: number,
	) {
		return this.movieService.findById(id);
	}

	@ApiOperation({
		summary: "Create a new movie",
	})
	@ApiBody({
		schema: {
			type: "object",
			properties: { title: { type: "string", example: "Spider Man" } },
		},
	})
	@Post()
	create(@Body() dto: MovieDto) {
		return this.movieService.create(dto);
	}

	@Put(":id")
	update(@Param("id") id: string, @Body() dto: MovieDto) {
		return this.movieService.update(id, dto);
	}

	@Delete(":id")
	delete(@Param("id") id: string) {
		return this.movieService.delete(id);
	}
}
