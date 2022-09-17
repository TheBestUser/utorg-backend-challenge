import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RateModule } from './rate/rate.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), RateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
