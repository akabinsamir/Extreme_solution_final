const completedService = require('../Services/listbyid');
const completedController = {};
const { db } = require('../Start/mysql');

completedController.listReport = async (req, res) => {
    try {


        let status = 'completed'
        let sql = `UPDATE reports SET Report_status = '${status}',Number_of_officers_allowed=0 WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, results) => {
            if (err) throw err;
            console.log(results);

        })



        let sql2 = `SELECT * FROM report_officer_assign WHERE Case_id = ${req.params.id}`;
        let query2 = db.query(sql2, (err, results) => {
            if (err) throw err;
            let listofficersarray = [];
            results.forEach(element => {
                listofficersarray.push(element)


            });

            for (var x = 0; x < listofficersarray.length; x++) {
                let sql3 = `UPDATE police_officers SET Status = 'free' WHERE Full_Name = '${listofficersarray[x].officer_name}'`;
                let query3 = db.query(sql3, (err, results) => {
                    if (err) throw err;

                })
            }
            let sql1 = `DELETE FROM report_officer_assign WHERE Case_id=${req.params.id}`;
            let query1 = db.query(sql1, (err, results) => {
                if (err) throw err;

                res.status(200).send("report is completed , Happy to help")

            })
        })


    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
module.exports = completedController;
//here 2nd