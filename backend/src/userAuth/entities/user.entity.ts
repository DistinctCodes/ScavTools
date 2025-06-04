import { ToolAccessLog } from '../../Tools/entities/tool-access-log.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ToolAccessLog, (log) => log.user)
  accessLogs: ToolAccessLog[];
}
