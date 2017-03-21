var express = require("express");
var sequelize = require("sequelize");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var rest = require("./REST.js");
var app  = express();

function REST(){
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self = this;

    // Config squelize
    var sqlObj = new sequelize(
      'rest', // database name
      'root', // user
      '1234', // password
      {
        host: 'localhost', // database host address
        dialect: 'mysql',  // kind of database

        pool: { // connection pool settings
          max: 5,
          min: 0,
          idle: 10000
        }
      });

    // Check connection
    sqlObj.authenticate()
      .then(function(err) {
        console.log('Connection has been established successfully.');
        self.configureExpress(sqlObj);
      })
      .catch(function (err) {
        console.log('Unable to connect to the database:', err);
        self.stop(err);
      });
}

REST.prototype.configureExpress = function(sqlObj) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(express.static('public'));
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,sqlObj);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(3000,function(){
          console.log("All right ! I am alive at Port 3000.");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
}

new REST();
