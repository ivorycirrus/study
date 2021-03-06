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
    var pool      =    mysql.createPool({
        // host info
        host     : 'localhost',
        user     : 'root',
        password : '1234',
        database : 'rest',
        debug    :  false,

        //connection pull option
        connectionLimit : 100,
        waitForConnections:true
    });
    pool.getConnection(function(err,connection){
        if(connection) connection.release();

        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(pool);
        }
    });
}

REST.prototype.configureExpress = function(connectionPool) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(express.static('public'));
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,connectionPool);
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
