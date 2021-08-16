# DB manager 2

## The idea

SaaS platform to design and manage data inside a no-code Database with ease.

## Functionalities

* [ ] Db schemas designed graphically (New tables, new fields, drag fields on form/list)
* [ ] Table views (list/form/massive assignment)
* [ ] Columns filter-able, sort-able, group-able
* [ ] Cascade copy (dependencies tables)
* [ ] Table relations (1-n field-table)
* [ ] Table interactions (sub-tables, relation tables)
* [ ] Validators/transfomations (injectable JS scripts for validate insert/update/delete, list/form adjusts, virtual sources, filters with authorizations)
* [ ] Authorizations (permission rules for roles, readonly, create/update, crud, single tables)
* [ ] Embeddable svelte components (table from id, method, mode, multi selection )
* [ ] Swagger dynamic crud apis

## MVP boundaries

* [ ] SASS designer (section to design schemas)
* [ ] SASS manager (section to manage data)
* [ ] List/Forms Web components

## Frontend Stack

* Svelte
* Carbon IBM (for speed up the MVP)
* Tailwind (For layout and advanced components)

## Backend Stack

* NestJS
* Knex (For manage db queries)
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

### design

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

### manage

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