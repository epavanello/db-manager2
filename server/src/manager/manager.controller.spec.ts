import { ManagerController } from './manager.controller'
import { ManagerService } from './manager.service'
import { SharedService } from '../shared.service'
import Knex from 'knex'

const knex = Knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './dev.sqlite3',
  },
})

describe('ManagerController', () => {
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
      const result = [
        {
          id: 1,
          name: 'dipen',
          description: 'Anagrafiche',
        },
      ]

      expect(await managerController.getAllTables()).toEqual(result)
    })
  })
})
