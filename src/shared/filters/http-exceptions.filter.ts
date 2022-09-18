import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ResponseFailure } from '../interfaces';

@Catch(HttpException)
export class HttpExceptionsFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const responseBody: ResponseFailure = {
      success: false,
      error: exception.message,
    };

    response.status(status).json(responseBody);
  }
}
