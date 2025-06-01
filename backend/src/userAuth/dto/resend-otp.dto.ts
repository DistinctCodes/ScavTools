import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('otp_resend_logs')
export class OtpResendLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @CreateDateColumn()
  requestedAt: Date;

  @Column({ default: false })
  success: boolean;
}
