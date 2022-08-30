const mysql = require('mysql');


//creating Database Confeguration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'extremedb'
});

//Connection to database
module.exports = function () {
    db.connect((err) => {
        if (err) {
            throw err; //throw error if found
        }

        console.log("connected successfully!!!");
    });
}

module.exports.db = db;