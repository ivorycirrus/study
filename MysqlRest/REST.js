var mysql   = require("mysql");

function REST_ROUTER(router,connectionPool) {
    var self = this;
    self.handleRoutes(router,connectionPool);
}

REST_ROUTER.prototype.handleRoutes = function(router,connectionPool) {
    var self = this;
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });

    router.get("/todo",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["todo"];
        query = mysql.format(query,table);
        connectionPool.getConnection(function(connErr,connection){
            if(connErr) {
                res.json({"Error" : true, "Message" : "Error MySQL connection"});
                if(connection) connection.release();
                return;
            }

            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    res.json({"Error" : false, "Message" : "Success", "Todo" : rows});
                }
                if(connection) connection.release();
            });
        });
        
    });

    router.get("/todo/:todo_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["todo","todo_id",req.params.todo_id];
        query = mysql.format(query,table);

        connectionPool.getConnection(function(connErr,connection){
            if(connErr) {
                res.json({"Error" : true, "Message" : "Error MySQL connection"});
                if(connection) connection.release();
                return;
            }

            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    res.json({"Error" : false, "Message" : "Success", "Todo" : rows});
                }
                if(connection) connection.release();
            });
        });
    });

    router.post("/todo",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["todo","todo","status",req.body.todo,req.body.status];
        query = mysql.format(query,table); 

        connectionPool.getConnection(function(connErr,connection){
            if(connErr) {
                res.json({"Error" : true, "Message" : "Error MySQL connection"});
                if(connection) connection.release();
                return;
            }

            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    res.json({"Error" : false, "Message" : "Todo Added !"});
                }
                if(connection) connection.release();
            });
        });
    });

    router.put("/todo/:todo_id",function(req,res){
        var query = "UPDATE ?? SET ?? = ? , ?? = ? WHERE ?? = ?";
        var table = ["todo","todo",req.body.todo,"status",req.body.status,"todo_id",req.params.todo_id];
        query = mysql.format(query,table);

        connectionPool.getConnection(function(connErr,connection){
            if(connErr) {
                res.json({"Error" : true, "Message" : "Error MySQL connection"});
                if(connection) connection.release();
                return;
            }

            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    res.json({"Error" : false, "Message" : "Updated the status for "+req.params.todo_id});
                }
                if(connection) connection.release();
            });
        });
    });

    router.delete("/todo/:todo_id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["todo","todo_id",req.params.todo_id];
        query = mysql.format(query,table);

        connectionPool.getConnection(function(connErr,connection){
            if(connErr) {
                res.json({"Error" : true, "Message" : "Error MySQL connection"});
                if(connection) connection.release();
                return;
            }

            connection.query(query,function(err,rows){
                if(err) {
                    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
                } else {
                    res.json({"Error" : false, "Message" : "Deleted todo "+req.params.todo_id});
                }
                if(connection) connection.release();
            });
        });
    });
}

module.exports = REST_ROUTER;
