const { db } = require('../Start/mysql');
const ReportService = {}

ReportService.submitReport = async (req, res) => {

    const today = new Date();
    let todaysdate = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();//format to get today's date (today.getMonth()+1) because getMonth starts from 0
    //report to be submitted (should be dynamic)
    let report = { title: 'Stolen Car', description: 'I went back from the office and did not find my car', license_number: '123abc', Car_color: 'red', Car_type: 'coupe', Report_Date: todaysdate, Theft_Date: '1/1/2001', Owner_fullname: 'abdelrahman samir hamed', Report_status: 'In progress', Number_of_officers_allowed: 1 };

    let tonesendarray = '';

    let sql = 'INSERT INTO reports SET ?'; //the "?" works as a place holder in 

    let query = db.query(sql, report, (err, result1) => {

        if (err) throw err;

        var listofficerssql = 'SELECT * FROM police_officers';
        let query1 = db.query(listofficerssql, (err, result) => {
            if (err) throw err;
            let listofficersarray = [];
            result.forEach(element => {
                listofficersarray.push(element)
            });

            for (let i = 0; i < listofficersarray.length; i++) {

                if (listofficersarray[i].Status == "free") {
                    tonesendarray = listofficersarray[i].Full_Name;
                    console.log(tonesendarray)
                    let sql = `UPDATE police_officers SET Status = 'In a Case' WHERE id = ${listofficersarray[i].id}`; //changing the assigned police office status to be in a case
                    let query = db.query(sql, (err, result) => {
                        if (err) throw err;

                    })
                    let join_table_record = { officer_name: listofficersarray[i].Full_Name, Case_id: result1.insertId };

                    let sql2 = 'INSERT INTO report_officer_assign SET ?'; //the "?" works as a place holder in sql
                    let query2 = db.query(sql2, join_table_record, (err, result) => {
                        if (err) throw err;
                    })
                    break;
                }
                // return listofficersarray[i]
            }
        })
    })
    return { report, tonesendarray };


};

module.exports = ReportService;