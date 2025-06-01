import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ToolType {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  WEB3 = 'web3',
}

@Entity()
export class Tool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'enum', enum: ToolType })
  type: ToolType;

  @Column('text', { array: true })
  tags: string[];

  @Column({ nullable: true })
  iconUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
