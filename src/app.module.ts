import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RateController } from './rate/rate.controller';
import { RateService } from './rate/rate.service';

@Module({
  imports: [],
  controllers: [AppController, RateController],
  providers: [AppService, RateService],
})
export class AppModule {}
