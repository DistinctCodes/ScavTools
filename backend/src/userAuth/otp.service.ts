import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OtpService {
	constructor(private prisma: PrismaService) {}

	async generate(email: string): Promise<string> {
		const otp = Math.floor(100000 + Math.random() * 900000).toString();
		const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

		await this.prisma.otpVerification.deleteMany({
			where: { email },
		});

		await this.prisma.otpVerification.create({
			data: {
				email,
				otp,
				expiresAt,
			},
		});

		return otp;
	}

	async verify(email: string, otp: string): Promise<boolean> {
		const record = await this.prisma.otpVerification.findFirst({
			where: {
				email,
				otp,
				isUsed: false,
				expiresAt: {
					gt: new Date(),
				},
			},
		});

		if (!record) return false;

		// Mark OTP as used
		await this.prisma.otpVerification.update({
			where: { id: record.id },
			data: { isUsed: true },
		});

		return true;
	}
}
