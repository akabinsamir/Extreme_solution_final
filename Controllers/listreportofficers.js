const listofficers = require('../Services/listreportofficers');
const listofficersController = {};
const { db } = require('../Start/mysql');

listofficersController.listReport = async (req, res) => {
    try {


        let sql1 = `SELECT * FROM report_officer_assign WHERE Case_id = ${req.params.id}`;
        let query1 = db.query(sql1, (err, results) => {
            if (err) throw err;
            var string = "results";
            res.status(200).send(results)
        })


    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
module.exports = listofficersController;
//here 2nd