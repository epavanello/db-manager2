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
Design namespace allow you to define the shape of tables.
Manage namespace allow you to CRUD data of specified tables.
### design
-  [x] [GET]    `/design/tables` _List of all table_
-  [x] [POST]   `/design/tables` _Create a new table (payload json)_
-  [x] [GET]    `/design/tables/:table_id` _Get current table_
-  [x] [PATCH]  `/design/tables/:table_id` _Update current table_
-  [x] [DELETE] `/design/tables/:table_id` _Delete current table_

-  [x] [GET]    `/design/tables/:table_id/fields` _List of all fields_
-  [x] [POST]   `/design/tables/:table_id/fields` _Create a new field (payload json)_
-  [x] [PATCH]  `/design/tables/:table_id/fields/:field_id` _Update a field (payload json)_
-  [x] [DELETE] `/design/tables/:table_id/fields/:field_id` _Delete a field (payload json)_

-  [ ] [GET]    `/design/tables/:table_id/list` _List of all lists_
-  [ ] [POST]   `/design/tables/:table_id/list` _Create a new list (payload json)_
-  [ ] [PATCH]  `/design/tables/:table_id/list/:list_id` _Update a list (payload json)_
-  [ ] [DELETE] `/design/tables/:table_id/list/:list_id` _Delete a list (payload json)_


-  [ ] [GET]    `/design/tables/:table_id/list:list_id/fields` _List of all list fields_
-  [ ] [POST]   `/design/tables/:table_id/list/:list_id/fields` _Create a new list field (payload json)_
-  [ ] [PATCH]  `/design/tables/:table_id/list/:list_id/fields/:list_field_id` _Update a list field (payload json)_
-  [ ] [DELETE] `/design/tables/:table_id/list/:list_id/fields/:list_field_id` _Delete a list field (payload json)_

### manage
-  [x] [GET]    `/manage/tables` _List of all table names_
-  [x] [GET]    `/manage/tables/:table_id` _Get current table definition_
-  [x] [GET]    `/manage/tables/:table_id/list?[FILTER_1]=a&[FILTER_2]=b` _get list data of specified table_ 
-  [x] [GET]    `/manage/tables/:table_id/row?[KEY_1]=a&[KEY_2]=b` _get row data for specific table_
-  [x] [POST]   `/manage/tables/:table_id/row` _create new row (payload json)_
-  [x] [PATCH]  `/manage/tables/:table_id/row?[KEY_1]=a&[KEY_2]=b` _update current row (payload json)_
-  [x] [DELETE] `/manage/tables/:table_id/row?[KEY_1]=a&[KEY_2]=b` _delete current row_

## GTD _(Getting Things Done)_
- [x] Minimal frontend setup
- [x] Minimal backend setup
- [x] DB connection
- [x] Basic schema definition/creation with migrations
- [ ] First rest APIs (see above)
- [ ] Basic UI components and rest calls
- [ ] JS editor and injection
- [ ] SSO integration
- [ ] UI polish
- [ ] Launch OSS (Project Hunter, DEV.to, Twitter)


## Next step
- [ ] Swagger api
- [ ] table id or alias support
