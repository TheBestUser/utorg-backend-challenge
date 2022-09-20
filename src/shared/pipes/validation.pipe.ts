import {
  Injectable,
  Optional,
  ValidationError,
  ValidationPipe as OriginValidationPipe,
  ValidationPipeOptions as OriginValidationPipeOptions,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { capitalize } from '../utils';

const DEFAULT_DELIMITER = '; ';

export interface ValidationPipeOptions extends OriginValidationPipeOptions {
  delimiter?: string;
}

@Injectable()
export class ValidationPipe extends OriginValidationPipe {
  private readonly delimiter: string;

  constructor(@Optional() options?: ValidationPipeOptions) {
    const { delimiter, ...restOptions } = options ?? {};
    super(options ? restOptions : undefined);

    this.delimiter = delimiter ?? DEFAULT_DELIMITER;
  }

  public override createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      if (this.isDetailedOutputDisabled) {
        return new HttpErrorByCode[this.errorHttpStatusCode]();
      }
      const errors: string[] = this.flattenValidationErrors(validationErrors);
      const errorMessage = errors.map(capitalize).join(this.delimiter);
      return new HttpErrorByCode[this.errorHttpStatusCode](errorMessage);
    };
  }
}
