var mysql = require("mysql");

var instance = null;

/* DB Connection Parameters */
const db_name = "vacationsDB";
const db_user = "root";
const db_pass = "";
const db_host = "localhost";

/* tables Names */
const admin_table_name = "admin";
const users_table_name = "users";
const vacations_table_name = "vacations";

/* users table admin values */
const admin_name = "Admin";
const admin_username = "Admin";
const admin_password = "$2b$10$.H7TjO7GsWLmPsYW9mYrRu6SSOaB5JsyxqaGX27rT8EwaROwGyWJe";
const admin_email = "galrubin2410@gmail.com";
const admin_role = 1;// administrator



var con = {
  getpool: function () {
    if (instance) {
      return instance;
    }
    createDB();
    instance = mysql.createPool({
      host: db_host,
      user: db_user,
      password: db_pass,
      database: db_name
    });
    return instance;
  }
}

var createDB = function () {
  var create_db_query = "CREATE DATABASE IF NOT EXISTS " + db_name;
  let connection = mysql.createConnection({
    host: db_host,
    user: db_user,
    password: db_pass
  });

  // connect to the MySQL server
  connection.connect(function (err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log("connection opend");

    connection.query(create_db_query, function (err, results, fields) {
      if (err) {
        console.log(err.message);
      }
      console.log("vacationsDB Created!");
      createTables();
    });

    connection.end(function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log("connection closed");
    });
  });
}

var createTables = function () {
  var create_admin_table_query = `create table if not exists ${admin_table_name}(
                            id int primary key auto_increment,
                            user_id int ,
                            vacation_id int 
                        )`;
  var create_users_table_query = `create table if not exists ${users_table_name}(
        id int primary key auto_increment,
        first_name varchar(255) not null,
        last_name varchar(255) not null, 
        email varchar(255) not null, 
        created DATE ,
        username varchar(255) unique,
        password varchar(255),
        role int default 1
    )`;
  var create_vacations_table_query = `create table if not exists ${vacations_table_name}(
      id int primary key auto_increment,
      name varchar(255) not null,
      description varchar(255) unique,
      destination varchar(255) unique,
      image varchar(255),
      date date,
      price int,
      number_of_followers int
  )`;
  let connection = mysql.createConnection({
    host: db_host,
    user: db_user,
    password: db_pass,
    database: db_name
  });

  // connect to the MySQL server
  connection.connect(function (err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log("connection opend");

    connection.query(create_admin_table_query, function (err, results, fields) {
      if (err) {
        console.log(err.message);
      }
      console.log("admin Table Created!");
    });
    connection.query(create_users_table_query, function (err, results, fields) {
      if (err) {
        console.log(err.message);
      }
      console.log("Users Table Created!");
      insertDefaultData();
    });
    connection.query(create_vacations_table_query, function (err, results, fields) {
      if (err) {
        console.log(err.message);
      }
      console.log("vacations Table Created!");
    });
    connection.end(function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log("connection closed");
    });
  });
}


var insertDefaultData = function () {
  let admin_user_query = `INSERT INTO ${users_table_name} (first_name,email,username,password,role) 
    values('${admin_name}','${admin_username}','${admin_email}','${admin_password}',${admin_role})`;
  console.log(admin_user_query);

  con.getpool().query(admin_user_query, function (err2, results2, fields2) {
    if (err2) {
      console.log(err2.message);
    }
    console.log("Admin Added To DB;");
  });
}

module.exports = con;