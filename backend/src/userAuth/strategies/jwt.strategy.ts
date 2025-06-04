import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
	sub: string;
	email: string;
	iat: number;
	exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_SECRET'),
		});
	}

	async validate(payload: JwtPayload) {
		if (!payload.sub || !payload.email) {
			throw new UnauthorizedException('Invalid token payload');
		}

		return {
			userId: payload.sub,
			email: payload.email,
		};
	}
}
