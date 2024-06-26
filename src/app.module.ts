import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FireblocksModule } from './fireblocks/fireblocks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Makes the config global across all modules
    }),
    AuthModule,
    FireblocksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
