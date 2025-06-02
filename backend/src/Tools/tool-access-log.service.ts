import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToolAccessLog } from './entities/tool-access-log.entity';
import { Repository } from 'typeorm';
import { User } from 'src/userAuth/entities/user.entity';
import { Tool } from './entities/tool.entity';

@Injectable()
export class ToolAccessLogService {
  constructor(
    @InjectRepository(ToolAccessLog)
    private accessLogRepo: Repository<ToolAccessLog>,
  ) {}

  async logAccess(user: User, tool: Tool): Promise<ToolAccessLog> {
    const log = this.accessLogRepo.create({ user, tool });
    return this.accessLogRepo.save(log);
  }


}
