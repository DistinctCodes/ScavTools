import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Login {
  @PrimaryGeneratedColumn('uuid') 
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

}
