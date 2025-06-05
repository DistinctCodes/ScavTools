import { IsEmail, IsString } from 'class-validator';

export class VerifyOtp {
	@IsEmail()
	email: string;

	@IsString()
	otp: string;
}
