const listbyidService = require('../Services/listbyid');
const listbyidController = {};
const { db } = require('../Start/mysql');

listbyidController.listReport = async (req, res) => {
    try {

        let sql = `SELECT * FROM reports WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, results) => {
            if (err) throw err;
            res.status(200).send(results)
        })


    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
module.exports = listbyidController;
//here 2nd