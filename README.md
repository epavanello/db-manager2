# DB manager 2

## The idea 
SaaS platform to design and manage data inside a no-code Database with ease.

## Functionalities
- Db schemas designed graphically (New tables, new fields, drag fields on form/list)
- Table views (list/form/massive assignment)
- Columns filter-able, sort-able, group-able
- Cascade copy (dependencies tables)
- Table relations (1-n field-table)
- Table interactions (sub-tables, relation tables)
- Validators/transfomations (injectable JS scripts for validate insert/update/delete, list/form adjusts, virtual sources, filters with authorizations)
- Authorizations (permission rules for roles, readonly, create/update, crud, single tables)
- Embeddable svelte components (table from id, method, mode, multi selection )
- Swagger dynamic crud apis

## Frontend Stack
- Svelte
- Carbon IBM
- Tailwind

## Backend Stack
- NestJS
- Knex
- Sqlite/Postgres
- Swagger generator
- JS injection (or V8 binding) 

## Schema
- Table
- Field
- List
- Form
- Functions
- Roles
- Users

## Rest APIs
-  `GET /[TABLE_ID]/shape`
-  `GET /[TABLE_ID]/list/[PARAMS]` 
-  `GET /[TABLE_ID]/row/[KEY]` 
-  `POST /[TABLE_ID]`
-  `PATCH /[TABLE_ID]/[KEY]`
-  `DELETE /[TABLE_ID]/[KEY]` 

## GTD _(Getting Things Done)_
- [x] Minimal frontend setup
- [x] Minimal backend setup
- [x] DB connection
- [x] Basic schema definition/creation with migrations
- [ ] First rest APIs (/shape, /list, /save)
- [ ] Basic UI components and rest calls
- [ ] JS editor and injection
- [ ] SSO integration
- [ ] UI polish
- [ ] Launch OSS (Project Hunter, DEV.to, Twitter)
