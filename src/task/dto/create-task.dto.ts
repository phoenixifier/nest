import {
	IsString,
	Length,
	IsOptional,
	IsNotEmpty,
	IsArray,
	IsEnum,
	IsBoolean,
	Matches,
	MinLength,
	IsUrl,
	IsUUID,
} from "class-validator";
import { StartsWith } from "../decorators/starts-with.decorator";

export enum TaskTag {
	WORK = "work",
	STUDY = "study",
}

export class CreateTaskDto {
	@IsString()
	@StartsWith("Task: ", { message: "Invalid name" })
	@IsNotEmpty()
	@Length(2, 12)
	name: string;

	@IsBoolean()
	completed: boolean;

	@IsArray()
	@IsEnum(TaskTag, { each: true })
	@IsOptional()
	tags: TaskTag[];

	@IsString()
	@MinLength(8)
	@Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
		message: "Password must contain at least one letter and one number:",
	})
	password: string;

	@IsUrl(
		{
			protocols: ["https"],
			require_valid_protocol: true,
			host_whitelist: ["google.com"],
		},
		{ message: "Incorrect URL format" },
	)
	websiteUrl: string;

	@IsUUID("4", { message: "Invalid UUID format" })
	userId: string;
}
