import { Module } from '@nestjs/common';
import { RateModule } from './rate';
import { ConfigModule } from '@nestjs/config';
import { HttpExceptionsFilter, ResponseTransformInterceptor } from './shared';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { PancakeSwapModule } from './pancake-swap';

@Module({
  imports: [ConfigModule.forRoot(), RateModule, PancakeSwapModule],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionsFilter },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
  ],
})
export class AppModule {}
