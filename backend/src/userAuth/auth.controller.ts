import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "./dto/create-user.dto";
import { Login } from "./dto/login.dto";
import { OtpResendLog } from "./dto/resend-otp.dto";
import { VerifyOtp } from "./dto/verify-otp.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { RefreshToken } from "./dto/refresh-token.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create')
  register(@Body() dto: User) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: Login) {
    return this.authService.login(dto);
  }

  @Post('resend-email/verification')
  resendEmail(@Body() dto: OtpResendLog) {
    return this.authService.initiatePasswordReset(dto.email);
  }

  @Post('verify-email')
  verifyEmail(@Body() dto: VerifyOtp) {
    return this.authService.verifyEmail(dto);
  }

  @Post('forget/password')
  forgetPassword(@Body() dto: OtpResendLog) {
    return this.authService.initiatePasswordReset(dto.email);
  }

  @Post('resend-forget/password')
  resendForget(@Body() dto: OtpResendLog) {
    return this.authService.initiatePasswordReset(dto.email);
  }

  @Post('verify/otp')
  verifyOtp(@Body() dto: VerifyOtp) {
    return this.authService.verifyEmail(dto);
  }

  @Post('reset/password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Post('refresh-token')
  refreshToken(@Body() dto: RefreshToken) {
    return this.authService.refreshToken(dto);
  }
}
