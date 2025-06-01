import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
  sendVerificationOtp(email: string, otp: string) {
    // TODO
    // Write function to send otp verification code when mail service is connected to this app
    
  }

  sendPasswordResetOtp(email: string, otp: string) {
   // Write function to send reset password otp  code when mail service is connected to this app
  }
}
