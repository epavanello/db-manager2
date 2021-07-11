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
-  [GET] `/tables` _List of all table names_
-  [GET] `/tables/[TABLE_ID]` _Get current table definition_ 
-  [GET] `/tables/[TABLE_ID]/list` _get list data of specified table_ 
-  [GET] `/tables/[TABLE_ID]/row/[KEY]` _get row data for specific table_
-  [POST] `/tables/[TABLE_ID]` _create new row_
-  [PATCH] `/tables/[TABLE_ID]/[KEY]` _update current row_
-  [DELETE] `/tables/[TABLE_ID]/[KEY]` _delete current row_

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
