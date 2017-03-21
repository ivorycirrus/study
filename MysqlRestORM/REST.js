var mysql   = require("mysql");
var Sequelize = require("sequelize");

function REST_ROUTER(router,objSequlize) {
    var self = this;
    self.handleRoutes(router,objSequlize);
}

REST_ROUTER.prototype.handleRoutes = function(router,objSequlize) {
    var self = this;

    // Define Model
    var Todo = objSequlize.define('todo', {
        todo_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        todo: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        status : {
            type : Sequelize.STRING,
            allowNull: true
        },
        due : {
            type: Sequelize.DATE,
            allowNull: true
        }
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,
        // don't add the paranoid attribute (deletedAt). it'll working with timestamp.
        paranoid : false,
        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,
        // define the table's name
        tableName: 'todo'
    });

    // [GET] for api test
    router.get("/",function(req,res){
        console.log("[Success] GET /");
        res.json({"Message" : "Hello World !"});
    });

    // [GET] retrieve all to-do list
    router.get("/todo",function(req,res){
        Todo.findAll({
            attributes : ['todo_id', 'todo', 'status', 'due']
        })
        .then(function(todos){
            console.log("[Success] GET /todo/");
            res.json({"Error" : false, "Message" : "Success", "Todo" : todos});
        })
        .catch(function(err){
            console.log("[Error] GET /todo | "+err);
            res.json({"Error" : true, "Message" : "Error executing query!!"});
        })
        .done();
    });

    // [GET] retrieve specfic to-do
    router.get("/todo/:todo_id",function(req,res){
        Todo.findAll({
            attributes : ['todo_id', 'todo', 'status', 'due'],
            where : {todo_id : req.params.todo_id}
        })
        .then(function(todos){
            console.log("[Success] GET /todo/"+req.params.todo_id);
            res.json({"Error" : false, "Message" : "Success", "Todo" : todos});
        })
        .catch(function(err){
            console.log("[Error] GET /todo | "+err);
            res.json({"Error" : true, "Message" : "Error executing query!!"});
        })
        .done();
    });

    // [POST] add a to-do
    router.post("/todo",function(req,res){
        Todo.create({ 
            todo : req.body.todo,
            status : req.body.status
        })
        .then(function(task) {
            console.log("[Success] POST /todo");
            res.json({"Error" : false, "Message" : "Todo Added !"});
        })
        .catch(function() {
            console.log("[Error] POST /todo | "+err);
            res.json({"Error" : true, "Message" : "Error executing query!!"});
        })
        .done();
    });

    // [PUT] update a to-do
    router.put("/todo/:todo_id",function(req,res){
        Todo.update(
            { todo : req.body.todo, status : req.body.status }, // data
            { where : {todo_id : req.params.todo_id}, returning: true } // condition
        ).then(function(result){
            console.log("[Success] PUT /todo/"+req.params.todo_id+" | rows : "+result);
            res.json({"Error" : false, "Message" : "Updated the status for "+req.params.todo_id});
        }).catch(function() {
            console.log("[Error] PUT /todo/"+req.params.todo_id+" | "+err);
            res.json({"Error" : true, "Message" : "Error executing query!!"});
        })
        .done();
    });

    // [DELETE] remove a to-do
    router.delete("/todo/:todo_id",function(req,res){
        Todo.destroy({
            where: {todo_id : req.params.todo_id}
        }).then(function(result) {
            console.log("[Success] DELETE /todo/"+req.params.todo_id+" | rows : "+result);
            res.json({"Error" : false, "Message" : "Deleted todo "+req.params.todo_id});
        }).catch(function(err) {
            console.log("[Error] DELETE /todo/"+req.params.todo_id+" | "+err);
            res.json({"Error" : true, "Message" : "Error executing query!!"});
        })
        .done();
    });
}

module.exports = REST_ROUTER;
