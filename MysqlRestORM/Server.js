var express = require("express");
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
    var sequelize = new Sequelize('rest', 'root', '1234', {
      host: 'localhost',
      dialect: 'mysql', //|'sqlite'|'postgres'|'mssql',

      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },

      // SQLite only
      //storage: 'path/to/database.sqlite'
    });

    // Check connection
    sequelize.authenticate().then(function() { 
      self.configureExpress(sequelize);
    }).catch(function(err){
      self.stop(err);
    }).done();
}

REST.prototype.configureExpress = function(objSequlize) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(express.static('public'));
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,objSequlize);
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
