import { Controller, Get } from '@nestjs/common'
import { Knex } from 'knex'
import { InjectKnex } from 'nestjs-knex'
import { AppService } from './app.service'
import { Field, Table } from './schema'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectKnex() private readonly knex: Knex
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
