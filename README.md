# DB manager 2

![Heroku deploy](https://github.com/epavanello/db-manager2/actions/workflows/deploy.yml/badge.svg)
![Tests](https://github.com/epavanello/db-manager2/actions/workflows/test-server.yml/badge.svg)

## The idea

SaaS platform to design database schema and relations and manage data graphically.
Use your db in your application as a web component (web-elements, react components, svelte components).

#### Example

``` javascript
import {TableList, TableForm} from 'db-manager-react';

export default () => <>
    <TableList id="users" multiple onSelectChange={trackMyRows}>
    </TableList>
    <TableForm id="users" onComplete={} onCancel={}>
    </TableForm>
</>
```

## Functionalities

* [ ] Db schemas designed graphically (New tables, new fields, drag fields on form/list)
* [ ] Table views and manage (list/form/massive assignment)
* [ ] Columns filter-able, sort-able, group-able
* [ ] Cascade copy (dependencies tables)
* [ ] Table relations (1-n field-table)
* [ ] Table interactions (sub-tables, relation tables)
* [ ] Validators/transfomations (injectable JS scripts for validate insert/update/delete, list/form adjusts, virtual sources, filters with authorizations)
* [ ] Authorizations (permission rules for roles, readonly, create/update, crud, single tables)
* [ ] Embeddable svelte components (table from id, method, mode, multi selection )
* [ ] Swagger dynamic crud apis

## MVP boundaries

* [ ] SAAS designer (section to design schemas)
* [ ] SAAS manager (section to manage data)
* [ ] List/Forms Web components

## Frontend Stack

* [Sveltekit](https://kit.svelte.dev/docs)
* [Carbon IBM](https://carbon-svelte.vercel.app/) (for speed up the MVP)
* [Tailwindcss](https://tailwindcss.com/) (For layout and advanced components)

## Backend Stack

* [NestJS](https://nestjs.com/)
* [Knexjs](https://knexjs.org/) (For manage db queries)
* Sqlite/Postgres (Sqlite to speed up the local development, postgres for prod)
* Swagger generator (To test NestJS integration)
* Backend-side JS injection (or V8 binding for Golang backend)

## Schema

* Table
* Field
* List
* Form
* Functions
* Roles
* Users

## Rest APIs

Design namespace allow you to define the shape of tables.
Manage namespace allow you to CRUD data of specified tables.

### Design (section to design schemas)

* [x] [GET] `/design/tables` *List of all table*
* [x] [POST] `/design/tables` *Create a new table (payload json)*
* [x] [GET] `/design/tables/:table_id` *Get current table*
* [x] [PATCH] `/design/tables/:table_id` *Update current table*
* [x] [DELETE] `/design/tables/:table_id` *Delete current table*
* [x] [GET] `/design/tables/:table_id/fields` *List of all fields*
* [x] [POST] `/design/tables/:table_id/fields` *Create a new field (payload json)*
* [x] [PATCH] `/design/tables/:table_id/fields/:field_id` *Update a field (payload json)*
* [x] [DELETE] `/design/tables/:table_id/fields/:field_id` *Delete a field (payload json)*
* [ ] [GET] `/design/tables/:table_id/list` *List of all lists*
* [ ] [POST] `/design/tables/:table_id/list` *Create a new list (payload json)*
* [ ] [PATCH] `/design/tables/:table_id/list/:list_id` *Update a list (payload json)*
* [ ] [DELETE] `/design/tables/:table_id/list/:list_id` *Delete a list (payload json)*
* [ ] [GET] `/design/tables/:table_id/list:list_id/fields` *List of all list fields*
* [ ] [POST] `/design/tables/:table_id/list/:list_id/fields` *Create a new list field (payload json)*
* [ ] [PATCH] `/design/tables/:table_id/list/:list_id/fields/:list_field_id` *Update a list field (payload json)*
* [ ] [DELETE] `/design/tables/:table_id/list/:list_id/fields/:list_field_id` *Delete a list field (payload json)*

### Manage (section to manage data)

* [x] [GET] `/manage/tables` *List of all table names*
* [x] [GET] `/manage/tables/:table_id` *Get current table definition*
* [x] [GET] `/manage/tables/:table_id/list?[FILTER_1]=a&[FILTER_2]=b` *get list data of specified table*
* [x] [GET] `/manage/tables/:table_id/row?[KEY_1]=a&[KEY_2]=b` *get row data for specific table*
* [x] [POST] `/manage/tables/:table_id/row` *create new row (payload json)*
* [x] [PATCH] `/manage/tables/:table_id/row?[KEY_1]=a&[KEY_2]=b` *update current row (payload json)*
* [x] [DELETE] `/manage/tables/:table_id/row?[KEY_1]=a&[KEY_2]=b` *delete current row*

## GTD *(Getting Things Done)*

* [x] Minimal frontend setup
* [x] Minimal backend setup
* [x] DB connection
* [x] Basic schema definition/creation with migrations
* [ ] First rest APIs (see above)
* [ ] Basic UI components and rest calls
* [ ] JS editor and injection
* [ ] SSO integration
* [ ] UI polish
* [ ] Launch OSS (Project Hunter, DEV.to, Twitter)

## Next step

* [ ] Swagger api
* [ ] table id or alias support
* [ ] Theming

## Ideas references

* Table + filters https://www.airtable.com/templates/featured/exp3FNmOkdHZvprXB/content-calendar
* https://nocodelist.co/?search=database
* UX - https://www.jotform.com/products/tables/?ref=nocodelist

## Developer steps

1. Clone the repo
2. Open in VSCODE
3. Install Yarn ([Installation \| Yarn](https://yarnpkg.com/getting-started/install))
4. Install??Recommended Extensions `CTRL + P` > `'Extensions:??Show Recommended Extensions'`
5. Install dependencies `cd client && yarn`??`cd server && yarn`
6. Migrate and seed db??`cd server && yarn??knex-rebuild`
7. Launch backend `cd server && start:dev`

## Highlighted scripts

### Server

* `yarn run start:dev` \- Run the server in watch mode
* `yarn run knex-rebuild` \- Create db and seed data
* `yarn run test` \- Run server tests
* `yarn run test:cov` \- Run test coverage

### Client

* `yarn run dev` \- Run the client
* `yarn run check` \- Verify typescript warning/errors on all project