# Project Initialization

`npm init`

- add libraries: _nodemon_, _express_, _sequelize_, _mysql2_

`npm i nodemon express sequelize mysql2`

- add sequelize-cli: tool create model,... for project (only run in dev environment)

`npm i sequelize-cli --save --dev`

- Declare project by sequelize

`npx sequelize-cli init`

# Operation Sequelize-CLI

## Create model

- Station

`npx sequelize model:generate --name Station --attributes name:string,address:string,province:string`

- Trip

`npx sequelize model:generate --name Users --attributes name:string,email:string,password:string,numberPhone:string,type:string`

...

- It create model at folder _migrations_
- Model have properties: name, address, province

## Sync table into Database

- create table
  `npx sequelize db:migrate`

- Delete table
  `npx sequelize db:migrate:undo`

# Seeder && Migration

- When initialization project NodeJS + Sequelize-CLI and using it to create Model, it will create 3 folder: _Model_, _Migration_, _Seeder_

_Modal_: data table
_Migration_: data table are saved into database to can undo when necessary

Ctrl + Z: `npx sequelize db:migrate:undo`

Ctrl + Y : `npx sequelize db:migrate`

_Seeder_: save 1 table backup data to can undo when necessary

Create file Seeder to save: `npx sequelize seed:generate --name [tên file backup]`

Save data: `npx sequelize db:seed:all`

Delete all data `npx sequelize db:seed:undo:all` (using when project ran in Production environment)
