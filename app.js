const express = require('express');
const { db } = require('./Start/mysql');
const app = express();

require('./Start/routes')(app);
require('./Start/mysql')();
//ROUTES FROM HERE (one time use "if needed")
//route to create database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE extremedb'; //sql statement of database creation
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('database created !!!')
        console.log(result);
    });
});

//routes to create a table 
//table of reports
app.get('/createreporttable', (req, res) => {
    let sql = 'CREATE TABLE reports(id int AUTO_INCREMENT,title VARCHAR(255),description VARCHAR(255),license_number VARCHAR(255),Car_color VARCHAR(255),Car_type VARCHAR(255),Report_Date VARCHAR(255),Theft_Date VARCHAR(255),Owner_fullname VARCHAR(255),Report_status VARCHAR(255),Number_of_officers_allowed INTEGER,PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Reports table is created !')
    })
})
//table of police officers
app.get('/createofficerstable', (req, res) => {
    let sql = 'CREATE TABLE police_officers(id int AUTO_INCREMENT,Full_Name VARCHAR(255), Status VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('officers table is created !')
    })
})

//table for assignees
app.get('/createjointable', (req, res) => {
    let sql = 'CREATE TABLE report_officer_assign(id int AUTO_INCREMENT,officer_name VARCHAR(255),Case_id VARCHAR(255),PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('report_officer_assign table is created !')
    })
})
app.listen('3000', () => {

    console.log("server started on port 3000")
});