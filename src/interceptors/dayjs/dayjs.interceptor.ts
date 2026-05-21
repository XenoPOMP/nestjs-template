import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import dayjs, { isDayjs } from 'dayjs';
import { Observable, map } from 'rxjs';

@Injectable()
export class DayjsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        if (data) {
          return this.convertDates(data);
        }
        return data;
      }),
    );
  }

  private convertDates(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    // If it's a Date object, convert it to your desired type (e.g., Unix timestamp number)
    if (isDayjs(obj)) {
      return obj.format();
    }
    // Convert Date to dayjs as well
    if (obj instanceof Date) {
      return dayjs(obj).format();
    }

    // Recursively handle arrays
    if (Array.isArray(obj)) {
      return obj.map(item => this.convertDates(item));
    }

    // Recursively handle nested object properties
    const convertedObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        convertedObj[key] = this.convertDates(obj[key]);
      }
    }

    return convertedObj;
  }
}
