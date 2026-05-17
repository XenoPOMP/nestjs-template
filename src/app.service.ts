import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getHello() {
    return {
      message: 'Hello World!',
    };
  }
}
