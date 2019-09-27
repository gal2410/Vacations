var express = require('express');
var connection_pool = require('../database/connection').getpool();
var response = require('../models/response');
const users = express.Router()
const cors = require('cors')
users.use(cors())


users.get('/', function (req, res, next) {
    response.clearResponse();
    connection_pool.query("SELECT * FROM vacations", function (err, results, fields) {
        if (err) {
            response.err = 1;
            response.response_text = err.message;
            res.json(response);
        }
        response.success = 1;
        response.response_text = "success getting results";
        response.data = results;
        res.json(response);
    });
});

users.get('/chart', function (req, res, next) {
    response.clearResponse();
    connection_pool.query("SELECT * FROM vacations", function (err, results, fields) {
        if (err) {
            response.err = 1;
            response.response_text = err.message;
            res.json(response);
        }
        response.success = 1;
        response.response_text = "success getting results";
        response.data = results;
        res.json(response);
    });
});



users.get('/postById', function (req, res, next) {
    response.clearResponse();
    var id = req.query.id;
    console.log("Edit ID: " + id);
    connection_pool.query("SELECT * FROM vacations where id=" + id, function (err, results, fields) {
        if (err) {
            response.err = 1;
            response.response_text = err.message;
            res.json(response);
            res.end();
        }
        response.success = 1;
        response.response_text = "success getting results";
        response.data = results;
        res.json(response);
        res.end();
    });
});

users.post('/', function (req, res, next) {
    response.clearResponse();
    console.log(req.body);
    var name = req.body.post.name;
    var description = req.body.post.description;
    var destination = req.body.post.destination;
    var image = req.body.post.image;
    var startDate = req.body.post.startDate;
    var endDate = req.body.post.endDate;
    var price = req.body.post.price;
    var number_of_followers = req.body.post.number_of_followers;
    var sql = `INSERT INTO vacations (name,description,destination,image,startDate,endDate,price,number_of_followers) values('${name}','${description}','${destination}','${image}','${startDate}','${endDate}','${price}','${number_of_followers}')`;
    connection_pool.query(sql, function (err, results, fields) {
        if (err) {
            response.err = 1;
            response.response_text = err.message;
            res.json(response);
        }
        response.success = 1;
        response.response_text = "success Adding Record";
        response.data = results;
        res.json(response);
    });
});

users.put('/', function (req, res, next) {
    console.log(req.body);
    response.clearResponse();
    var post_to_edit = req.body.post;
    var id = post_to_edit.id;
    var name = post_to_edit.name;
    var description = post_to_edit.description;
    var destination = post_to_edit.destination;
    var image = post_to_edit.image;
    var startDate = post_to_edit.startDate;
    var endDate = post_to_edit.endDate;
    var price = post_to_edit.price;
    var number_of_followers = post_to_edit.number_of_followers;
    var sql = `UPDATE vacations SET name='${name}',description='${description}',destination='${destination}',image='${image}',startDate='${startDate}',endDate='${endDate}',price='${price}',number_of_followers=${number_of_followers}  WHERE id = ${id}`;
    console.log(sql);
    connection_pool.query(sql, function (err, results, fields) {
        if (err) {
            response.err = 1;
            response.response_text = err.message;
            res.json(response);
            res.end();
        }
        response.success = 1;
        response.response_text = "success Updating Record";
        response.data = results;
        res.json(response);
    });
});

users.delete('/', function (req, res, next) {
    response.clearResponse();

    var id = req.body.id;
    console.log(req.body);
    if (id) {
        var sql = `DELETE FROM vacations WHERE id = ${id}`;
        console.log(sql);
        try {
            connection_pool.query(sql, function (err, results, fields) {
                if (err) {
                    response.err = 1;
                    response.response_text = err.message;
                    res.json(response);
                    res.end();
                }
                response.success = 1;
                response.response_text = "success Deleting Record";
                response.data = results;
                res.json(response);
                res.end();
            });
        } catch (err_catch) {
            response.err = 1;
            response.response_text = err_catch.message;
            res.json(response);
            res.end();
        }
    } else {
        response.err = 1;
        response.response_text = "Id Not Set";
        res.json(response);
        res.end();
    }


});

users.get('/allfollow', function (req, res, next) {
    response.clearResponse();
    connection_pool.query("SELECT number_of_followers FROM vacations", function (err, results, fields) {
        if (err) {
            res.json(results);
        }

        res.json(results);
        console.log(results)

    })


});


users.post('/follow', function (req, res, next) {
    var user_id = req.body.user_id;
    console.log(user_id)
    connection_pool.query("SELECT * FROM `admin` WHERE `vacation_id`=" + req.body.id + " and `user_id` = " + user_id + "", function (err, result, fields) {
        if (err) {
            console.log('router.get 1st query error' + err);
        } else {
            if (result.length == 0) {
                connection_pool.query("INSERT INTO `admin`(`vacation_id`, `user_id`) VALUES (" + req.body.id + "," + user_id + ")", function (err, result, fields) {
                    connection_pool.query(" UPDATE vacations v SET number_of_followers = (SELECT COUNT(*) FROM admin a WHERE a.vacation_id =  " + req.body.id + ") WHERE v.id = " + req.body.id + "", function (err, result, fields) {

                    })
                    res.send('user id  is now fllowing vacation number ');
                })

            } else {
                connection_pool.query("DELETE FROM `admin` WHERE `vacation_id`=" + req.body.id + " and `user_id` = " + user_id + "", function (err, result, fields) {
                    connection_pool.query(" UPDATE vacations v SET number_of_followers = (SELECT COUNT(*) FROM admin a WHERE a.vacation_id =  " + req.body.id + ") WHERE v.id = " + req.body.id + "", function (err, result, fields) {

                        res.send('user id X is no longer fllowing vacation number: ');
                    })
                })
            }
        }
    })


});


users.get('/follow', function (req, res, next) {

    response.clearResponse();
    connection_pool.query("SELECT COUNT(vacation_id) FROM admin ", function (err, results, fields) {
        if (err) {
            response.err = 1;
            response.response_text = err.message;
            res.json(response);
        }
        response.success = 1;
        response.response_text = "success getting results";
        response.data = results;
        res.json(response);
    });

});

module.exports = users;
