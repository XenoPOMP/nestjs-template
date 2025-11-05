import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Endpoint } from './decorators/endpoint';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Endpoint('GET', '/', {
    code: 200,
  })
  getHello() {
    return this.appService.getHello();
  }
}
