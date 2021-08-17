import { ManagerController } from './manager.controller'
import { ManagerService } from './manager.service'
import { SharedService } from '../shared.service'
import Knex from 'knex'
import { HttpException } from '@nestjs/common'

const knex = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './dev.sqlite3',
  },
})

const tableList = [
  {
    id: 1,
    name: 'dipen',
    description: 'Anagrafiche',
  },
]

describe('Manager APIs', () => {
  let managerController: ManagerController
  let managerService: ManagerService
  let sharedService: SharedService

  afterAll((done) => {
    knex.destroy().then(() => done())
  })

  beforeEach(async () => {
    sharedService = new SharedService(knex)
    managerService = new ManagerService(knex, sharedService)
    managerController = new ManagerController(knex, managerService, sharedService)
  })

  describe('getAllTables', () => {
    it('should return an array of all available tables', async () => {
      expect(await managerController.getAllTables()).toEqual(tableList)
    })
  })

  describe('getTable', () => {
    it('should return the correct table', async () => {
      expect(await (await managerController.getTable(1)).name).toEqual(tableList[0].name)
    })
    it('should generate exception if missing table id', async () => {
      await expect(managerController.getTable(999)).rejects.toThrow(HttpException)
    })
  })
})
