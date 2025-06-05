import { IsEmail } from 'class-validator';

export class OtpResendLog {
	@IsEmail()
	email: string;
}
