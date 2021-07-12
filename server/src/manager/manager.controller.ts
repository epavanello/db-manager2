import { Controller, Get } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { Table } from 'src/schema';

@Controller('tables')
export class ManagerController {
    constructor(
        @InjectKnex() private readonly knex: Knex,) {

    }
    @Get()
    allTables() {
        return this.knex<Table>("table").select("id").select("name").select("description")
    }
}
