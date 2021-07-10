import { Controller, Get } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectKnex() private readonly knex: Knex,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getRow')
  async getRow() {
    return this.knex.select('*').from('table');
  }

  @Get('createRow')
  async createRow() {
    return this.knex.insert({ name: 'dipen' }).into('table');
  }
}
