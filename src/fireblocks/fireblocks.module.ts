import { Module } from '@nestjs/common';
import { FireblocksController } from './fireblocks.controller';
import { FireblocksService } from './fireblocks.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [FireblocksController],
  providers: [FireblocksService, AuthService]
})
export class FireblocksModule { }
