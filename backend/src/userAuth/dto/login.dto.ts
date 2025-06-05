import { IsEmail, IsString } from 'class-validator';

export class Login {
	@IsEmail()
	email: string;

	@IsString()
	password: string;
}
