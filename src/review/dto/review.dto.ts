import {
	IsDecimal,
	IsInt,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	IsUUID,
	Max,
	Min,
} from "class-validator";

export class ReviewDto {
	@IsNotEmpty()
	@IsString()
	description: string;

	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	@Max(10)
	rating: number;

	@IsUUID("4")
	movieId: string;
}
