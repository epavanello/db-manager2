# DB manager 2

## The idea 
SaaS platform to design and manage data inside a no-code Database with ease.

## Functionalities
- Db schemas designed graphically
- Table views (list/form/massive assignment)
- Columns filtrable, sortable, groupable
- Dependencies copyable
- Table relations (1-n field-table)
- Table interactions (sub-tables, relation tables)
- Validators/trasfomations (injectable JS scripts for validate insert/update/delete, list/form adjusts, virtual sources, filters with authorizations)
- Authorizations (permission rules for roles, readonly, create/update, crud, single tables)
- Embeddable svelte components (table from id, method, mode, multi selection )
- Swagger dynamic crud apis

## Frontend Stack
- Frontend
- Svelte
- Carbon ibm
- Tailwind

## Backend Stack
- TS (or Golang for performance)
- TypeORM (or Gorm)
- Postgres
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

## Rest apis
-  `GET /[TABLE_ID]/shape`
-  `GET /[TABLE_ID]/list/[PARAMS]` 
-  `GET /[TABLE_ID]/row/[KEY]` 
-  `POST /[TABLE_ID]`
-  `PATCH /[TABLE_ID]/[KEY]`
-  `DELETE /[TABLE_ID]/[KEY]` 
