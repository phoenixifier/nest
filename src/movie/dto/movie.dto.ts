import {
	IsArray,
	IsInt,
	IsNotEmpty,
	IsPositive,
	IsString,
	IsUUID,
	Max,
	Min,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class MovieDto {
	@ApiProperty({
		description: "Movie Title",
		example: "Spider Man",
		type: String,
	})
	@IsNotEmpty()
	@IsString()
	title: string;

	@ApiProperty({
		description: "Movie Release Year",
		example: "2000",
		type: Number,
	})
	@IsNotEmpty()
	@IsInt()
	@Min(1888)
	@Max(new Date().getFullYear())
	@IsPositive()
	releaseYear: number;

	@ApiPropertyOptional({
		description: "Poster image",
		example: "https://some-image.png",
		type: String,
	})
	@IsString()
	imageUrl: string;

	@IsArray()
	@IsUUID("4", { each: true })
	actorIds: string[];
}
