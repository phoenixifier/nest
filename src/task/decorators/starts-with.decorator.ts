import {
	registerDecorator,
	type ValidationArguments,
	type ValidationOptions,
} from "class-validator";

export const StartsWith = (
	prefix: string,
	validationOptions?: ValidationOptions,
) => {
	return (object: Object, propertyName: string) => {
		registerDecorator({
			name: "startsWith",
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					return typeof value === "string" && value.startsWith(prefix);
				},
				defaultMessage(args: ValidationArguments) {
					return `The name should start with ${prefix}`;
				},
			},
		});
	};
};
