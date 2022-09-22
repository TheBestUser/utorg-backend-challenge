import { Module } from '@nestjs/common';
import { RateModule } from './rate';
import { ConfigModule } from '@nestjs/config';
import {
  HttpExceptionsFilter,
  ResponseTransformInterceptor,
  ValidationPipe,
} from './shared';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { PancakeSwapModule } from './pancake-swap';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RateModule,
    PancakeSwapModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionsFilter },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
