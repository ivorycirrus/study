# Node.js To-do Service

## About
Todo web application based on node.js and angular.js.

## Setup
1. node module dependencies
```
npm install
```

2. configure database connection info
edit Server.js file
```javascript
var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : '1234',
        database : 'rest',
        debug    :  false
    });
```

## Run
1. start server
```
npm start
```

2. open web page
```
http://localhost:3000/index.html
```

## References

This To-do application based on below projects with some modifications.

* Node.js RESTful Service : https://codeforgeek.com/2015/03/restful-api-node-and-express-4/
* Angular/Bootstrap based Client : https://www.tutorialspoint.com/angularjs/angularjs_todo_application.htm
