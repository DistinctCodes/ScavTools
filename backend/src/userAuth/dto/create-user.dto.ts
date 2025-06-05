import {
	IsString,
	IsEmail,
	MinLength,
	MaxLength,
	IsOptional,
} from 'class-validator';

export class User {
	@IsString()
	@MaxLength(50)
	firstName: string;

	@IsString()
	@MaxLength(50)
	lastName: string;

	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8)
	@MaxLength(32)
	password: string;

	@IsOptional()
	@IsString()
	profileImage?: string;
}
