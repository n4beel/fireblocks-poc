import { Controller, Get, Param } from '@nestjs/common';
import { FireblocksService } from './fireblocks.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('crypto')
export class FireblocksController {
  constructor(
    private fireblocksService: FireblocksService,
    private usersService: AuthService
  ) { }

  @Get('generateAddress/:userId')
  async generateAddress(@Param('userId') userId: string) {
    return await this.fireblocksService.generateAddressForUser(userId);
  }

  @Get('getAddress/:userId')
  getAddress(@Param('userId') userId: string) {
    return this.usersService.getUserAddress(userId);
  }
}
