import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../userAuth/entities/user.entity';
import { Tool } from './tool.entity';

@Entity()
export class ToolAccessLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Tool, { eager: true, onDelete: 'CASCADE' })
  tool: Tool;

  @CreateDateColumn()
  accessedAt: Date;
}
