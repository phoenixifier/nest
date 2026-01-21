import {
	IsInt,
	IsNotEmpty,
	IsPositive,
	IsString,
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
}
