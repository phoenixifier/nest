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

export class MovieDto {
	@IsNotEmpty()
	@IsString()
	title: string;

	@IsNotEmpty()
	@IsInt()
	@Min(1888)
	@Max(new Date().getFullYear())
	@IsPositive()
	releaseYear: number;

	@IsString()
	imageUrl: string;

	@IsArray()
	@IsUUID("4", { each: true })
	actorIds: string[];
}
