import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RateController } from './rate/rate.controller';

@Module({
  imports: [],
  controllers: [AppController, RateController],
  providers: [AppService],
})
export class AppModule {}
