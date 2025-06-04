import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class AuthExceptionFilter implements ExceptionFilter {
	catch(exception: UnauthorizedException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();

		response.status(status).json({
			statusCode: status,
			message: exception.message,
			error: 'Unauthorized',
			timestamp: new Date().toISOString(),
		});
	}
}
