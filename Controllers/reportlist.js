const ReportlistService = require('../Services/reportlist');
const ReportlistController = {};
const { db } = require('../Start/mysql');

ReportlistController.listReport = async (req, res) => {
    try {
        let sql = 'SELECT * FROM reports';
        let query = db.query(sql, (err, results) => {
            if (err) throw err;

            res.status(200).send(results)

        })


    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
module.exports = ReportlistController;
//here 2nd