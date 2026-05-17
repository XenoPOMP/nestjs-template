import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { Endpoint } from './decorators/endpoint';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Endpoint('GET', '/', {
    code: 200,
  })
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getHello() {
    return this.appService.getHello();
  }
}
