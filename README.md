# Space invaders

Get ready to invade your spaces!

## Instructions

1. Clone the repository
2. To get a faster setup create a new account on mlab.com add a new database and usename for that database
3. Be sure to add a config.json file inside the config folder with your database details ej:
```json
{
    "uname": "yourUserName",
    "pwd": "yourPassword",
    "dbinstance": "@dsxxxxx.mlab.com:xxxxx/databasename"
}
```
4. run `npm install`
5. run `node /bin/www` or `nodemon /bin/www`
6. go to http://localhost:3000
7. you can also go to http://localhost:3000/api/setupInvasions to create some example records on the backend