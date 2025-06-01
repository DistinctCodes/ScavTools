import { Injectable } from "@nestjs/common";

@Injectable()
export class OtpService {
  private otpStore = new Map<string, { otp: string, expires: number }>();

  generate(email: string): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpStore.set(email, { otp, expires: Date.now() + 5 * 60 * 1000 }); 
    return otp;
  }

  verify(email: string, otp: string): boolean {
    const record = this.otpStore.get(email);
    if (!record || record.expires < Date.now() || record.otp !== otp) return false;
    this.otpStore.delete(email);
    return true;
  }
}
