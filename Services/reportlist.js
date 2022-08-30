const { json } = require('express');
const { db } = require('../Start/mysql');
const ReportlistService = {}
var resultss = [];
ReportlistService.listReport = async (req, res) => {

    //get list of reports


    let sql = 'SELECT * FROM reports';
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        //console.log(results);
        //res.send(results)
        //resultss = [{ value: results }]
    })
    resultss = query.rows
    return resultss;
};

module.exports = ReportlistService;