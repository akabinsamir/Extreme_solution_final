const officersallowedservice = require('../Services/officersallowed');
const officersallowedController = {};
const { db } = require('../Start/mysql');

officersallowedController.listReport = async (req, res) => {
    try {

        let sql3 = `SELECT * FROM police_officers WHERE Status='free'`;
        let query3 = db.query(sql3, (err, results) => {
            if (err) throw err;
            let freeofficers = [];
            results.forEach(element => {
                freeofficers.push(element)

            });
            if (freeofficers.length > 0) {
                let sql = `UPDATE reports SET Number_of_officers_allowed = Number_of_officers_allowed+1  WHERE id = ${req.params.id}`;
                let query = db.query(sql, (err, results) => {
                    if (err) throw err;

                    let listofficerssql = 'SELECT * FROM police_officers';
                    let query1 = db.query(listofficerssql, (err, result) => {
                        if (err) throw err;
                        let listofficersarray = [];
                        result.forEach(element => {
                            listofficersarray.push(element)
                        });

                        for (let i = 0; i < listofficersarray.length; i++) {

                            if (listofficersarray[i].Status == "free") {

                                let sql = `UPDATE police_officers SET Status = 'In a Case' WHERE id = ${listofficersarray[i].id}`; //changing the assigned police office status to be in a case
                                let query = db.query(sql, (err, result) => {
                                    if (err) throw err;

                                })
                                let join_table_record = { officer_name: listofficersarray[i].Full_Name, Case_id: req.params.id };

                                let sql2 = 'INSERT INTO report_officer_assign SET ?'; //the "?" works as a place holder in sql
                                let query2 = db.query(sql2, join_table_record, (err, result) => {
                                    if (err) throw err;

                                })


                                break;
                            }


                        }
                    })


                    res.send("updated report :" + req.params.id + " to have 1 extra officer to be assigned !");

                })
            } else {
                res.send("sorry general ! , no available officers ");
            }
        })




    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
module.exports = officersallowedController;
//here 2nd