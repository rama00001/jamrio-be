const mysql = require('mysql2');
const uuid = require('uuid');
const idAutoIncrement = require("id-auto-increment");
const short = require('shortid');

// connection configurations
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin@123',
    database: 'jamrio'
});

// connect to database
connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected with mysql database...')
})

// Create and Save a new Todo
exports.create = (req, res) => {
    // Validate request
    // console.log("id" +short());
    // req.body.id= short();

    if (!req.body.description || !req.body.title) {
        return res.status(400).send({
            message: "Post description or Post title can not be empty"
        });
    }

    var params = req.body;
    console.log(params);

    connection.query("INSERT INTO posts SET ? ", params,
        function (error, results, fields) {
            if (error) throw error;
            return res.send({
                data: results,
                message: 'New post has been created successfully.'
            });
        });
};

// Retrieve and return all todos from the database.
exports.findAll = (req, res) => {
    connection.query('select * from posts',
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Find a single todo with a id
exports.findOne = (req, res) => {

    connection.query('select * from posts where Id=?',
        [req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Update a todo identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.description || !req.body.title) {
        return res.status(400).send({
            message: "Post description can not be empty"
        });
    }

    console.log(req.params.id);
    console.log(req.body.description);
    connection.query('UPDATE `posts` SET `title`=?,`description`=? where `id`=?',
        [req.body.title, req.body.description, req.params.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        });
};

// Delete a todo with the specified id in the request
exports.delete = (req, res) => {
    console.log(req.body);
    connection.query('DELETE FROM `posts` WHERE `id`=?', 
        [req.params.id], function (error, results, fields) {
            if (error) throw error;
            res.end('Record has been deleted!');
    });
};