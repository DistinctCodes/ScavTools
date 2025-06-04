import { IsString } from 'class-validator';

export class RefreshToken {
	@IsString()
	refreshToken: string;
}
