import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { ResendOtpDto } from "./dto/resend-otp.dto";
import { VerifyOtpDto } from "./dto/verify-otp.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('resend-email/verification')
  resendEmail(@Body() dto: ResendOtpDto) {
    return this.authService.initiatePasswordReset(dto.email);
  }

  @Post('verify-email')
  verifyEmail(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyEmail(dto);
  }

  @Post('forget/password')
  forgetPassword(@Body() dto: ResendOtpDto) {
    return this.authService.initiatePasswordReset(dto.email);
  }

  @Post('resend-forget/password')
  resendForget(@Body() dto: ResendOtpDto) {
    return this.authService.initiatePasswordReset(dto.email);
  }

  @Post('verify/otp')
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyEmail(dto);
  }

  @Post('reset/password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Post('refresh-token')
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto);
  }
}
