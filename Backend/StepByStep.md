# Project Initialization

`npm init`

- add libraries: _nodemon_, _express_, _sequelize_, _mysql2_

`npm i nodemon express sequilize mysql2`

- add sequelize-cli: tool tạo sẵn model,... cho project (chỉ chạy trên dev enviroment)

`npm i sequelize-cli --save --dev`

- Khởi tạo project với sequelize

`npx sequelize-cli init`

# Thao tác Sequelize-CLI

## Create model

`npx sequelize model:generate --name Station --attributes name:string,address:string,province:string`

- Ở dây nó sẽ tạo ra model tại folder _migrations_
- Với các thuộc tính name, address, province

## Sync table into Database

- create table
  `npx sequelize db:migrate`

- Delete table
  `npx sequelize db:migrate undo`
