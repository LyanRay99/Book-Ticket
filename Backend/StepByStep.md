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
`npx sequelize model:generate --name Users --attributes name:string,email:string,password:string,numberPhone:string,type:string`

- Ở dây nó sẽ tạo ra model tại folder _migrations_
- Với các thuộc tính name, address, province

## Sync table into Database

- create table
  `npx sequelize db:migrate`

- Delete table
  `npx sequelize db:migrate undo`

# Seeder && Migration

- Khi tạo project NodeJS với Sequelize-CLI và dùng nó để tạo Model
- Thì nó sẽ tạo ra 3 folder: _Model_, _Migration_, _Seeder_

_Modal_: data table mà ta đã tạo
_Migration_: đồng bộ lưu các edit mà ta đã thực hiện với database để có thể undo lại khi cần

Ctrl + Z: `npx sequelize db:migrate undo`

Ctrl + Y : `npx sequelize db:migrate`

_Seeder_: lưu 1 bảng backup data để ta có thể undo lại khi cần

Tạo file Seeder để lưu: `npx sequelize seed:generate --name [tên file backup]`

Lưu data: `npx sequelize db:seed:all`

Xóa all data `npx sequelize db:seed:undo:all` (khi project đã chạy trên môi trường Production)
