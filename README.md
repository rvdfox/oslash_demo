===================
PROJECT SETUP GUIDE
===================

* Prerequisites 

> NodeJs v12.20.0(or greater)
> PostgreSQL v11.11

* Steps to spin the server locally

1> Extract Project folder and open a terminal inside the folder.
2> Install dependencies, by running the command `npm install`.
3> update local postgres credentials [username,password] in `config/config.json` under development section, and test section.
4> run: `node ./scripts/create_db.js`, this will create a database `oslashdb` in local postgres.
5> run: `sequelize db:migrate --env=development`, this will migrate the schema and will create all necessary tables in the db.
6> run: `npm run dev` or `node server.js` to spin up the server.

To test
1> run `npx cross-env NODE_ENV=test npx sequelize-cli db:create` this will create a test database `oslashdb_test`
2> run `npm test`, this will test all major scenarios of REST API like registering a user, login, create a short and list shortcuts.

* POSTMAN API collection

Postman api collection can be accessed from this link: https://api.postman.com/collections/371061-23fbbf77-552c-44a8-8512-e5c3289487f4?access_key=PMAT-01GM6SDP0211630A34NPAR99EX

Author: Ravi Verma
Mobile: +91-9901384898
E-mail: ravivermakumar@yahoo.co.in
