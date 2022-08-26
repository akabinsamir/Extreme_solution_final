const express = require('express');
const mysql = require('mysql');

//creating Database Confeguration
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'extremedb'
});

//Connection to database
db.connect((err)=>{
    if(err)
    {
        throw err; //throw error if found
    }

    console.log("connected successfully!!!");
});

const app = express();
//ROUTES FROM HERE (one time use "if needed")
//route to create database
app.get('/createdb', (req,res)=>{
    let sql = 'CREATE DATABASE extremedb'; //sql statement of database creation
    db.query(sql , (err,result)=>{
        if(err) throw err;
        res.send('database created !!!')
        console.log(result);
    });
});

//routes to create a table 
//table of reports
app.get('/createreporttable', (req,res)=>{
    let sql = 'CREATE TABLE reports(id int AUTO_INCREMENT,title VARCHAR(255),description VARCHAR(255),license_number VARCHAR(255),Car_color VARCHAR(255),Car_type VARCHAR(255),Report_Date VARCHAR(255),Theft_Date VARCHAR(255),Owner_fullname VARCHAR(255),Report_status VARCHAR(255),Number_of_officers_allowed INTEGER,PRIMARY KEY (id))';
    db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('Reports table is created !')
    })
})
//table of police officers
app.get('/createofficerstable', (req,res)=>{
    let sql = 'CREATE TABLE police_officers(id int AUTO_INCREMENT,Full_Name VARCHAR(255), Status VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('officers table is created !')
    })
})

//table for assignees
app.get('/createjointable', (req,res)=>{
    let sql = 'CREATE TABLE report_officer_assign(id int AUTO_INCREMENT,officer_name VARCHAR(255),Case_id VARCHAR(255),PRIMARY KEY (id))';
    db.query(sql, (err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send('report_officer_assign table is created !')
    })
})
//ROUTES FROM HERE for application usage
//anything regarding submitting a report or selecting reports (listing)
app.get('/submitreport', (req,res)=>{
    const today = new Date();
    let todaysdate = today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();//format to get today's date (today.getMonth()+1) because getMonth starts from 0
    //report to be submitted (should be dynamic)
    let report = {title:'Stolen Car',description:'I went back from the office and did not find my car',license_number:'123abc',Car_color:'red',Car_type:'coupe',Report_Date:todaysdate,Theft_Date:'1/1/2001',Owner_fullname:'abdelrahman samir hamed' ,Report_status:'In progress',Number_of_officers_allowed:1};
       
    let sql = 'INSERT INTO reports SET ?'; //the "?" works as a place holder in sql
    let query = db.query(sql,report,(err,result1)=>{
        if(err) throw err;
        let listofficerssql = 'SELECT * FROM police_officers';
        let query1 = db.query(listofficerssql,(err,result)=>{
        if(err) throw err;
        let listofficersarray = [];
        result.forEach(element => {
        listofficersarray.push(element)
    });

    for (let i = 0 ; i<listofficersarray.length ; i++)
    {
        if(listofficersarray[i].Status == "free")
        {
        
        let sql = `UPDATE police_officers SET Status = 'In a Case' WHERE id = ${listofficersarray[i].id}`; //changing the assigned police office status to be in a case
        let query = db.query(sql,(err,result)=>{
        if(err) throw err;
        
        })
        let join_table_record = {officer_name:listofficersarray[i].Full_Name,Case_id:result1.insertId};
   
        let sql2 = 'INSERT INTO report_officer_assign SET ?'; //the "?" works as a place holder in sql
        let query2 = db.query(sql2,join_table_record,(err,result)=>{
        if(err) throw err;
        res.send('Report submitted for Car '+report.license_number+' , officer : ' +listofficersarray[i].Full_Name+' is assigned to your case , Will keep you posted')
        })
        break;
        }
    }
    })

    
    })
 
    

})

//get list of reports
app.get('/listreports', (req,res)=>{
  
    let sql = 'SELECT * FROM reports'; 
    let query = db.query(sql,(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.send(results)
    })
})

//get specific report by any characteristics (id)
app.get('/listreports/:id', (req,res)=>{
  
    let sql = `SELECT * FROM reports WHERE id = ${req.params.id}`; 
    let query = db.query(sql,(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.send(results)
    })
    
})

//list report officers
app.get('/listreportofficers/:id', (req,res)=>{
  
    let sql1 = `SELECT * FROM report_officer_assign WHERE Case_id = ${req.params.id}`; 
    let query1 = db.query(sql1,(err,results)=>{
        if(err) throw err;
        var string = "results";
        res.send(results)
    })
})

//Update specific report to be completed (when finding the car)
app.get('/updatereportsstatus/:id', (req,res)=>{
    let status = 'completed'
    let sql = `UPDATE reports SET Report_status = '${status}',Number_of_officers_allowed=0 WHERE id = ${req.params.id}`; 
    let query = db.query(sql,(err,results)=>{
        if(err) throw err;
        console.log(results);
       
    })

   

    let sql2 = `SELECT * FROM report_officer_assign WHERE Case_id = ${req.params.id}`; 
    let query2 = db.query(sql2,(err,results)=>{
        if(err) throw err;
        let listofficersarray = [];
        results.forEach(element => {
        listofficersarray.push(element)

        
    });
    
    for (var x = 0 ; x<listofficersarray.length ; x++)
    {
        let sql3 = `UPDATE police_officers SET Status = 'free' WHERE Full_Name = '${listofficersarray[x].officer_name}'`; 
        let query3 = db.query(sql3,(err,results)=>{
            if(err) throw err;
    
        })
    }
    let sql1 = `DELETE FROM report_officer_assign WHERE Case_id=${req.params.id}`; 
    let query1 = db.query(sql1,(err,results)=>{
        if(err) throw err;
        
        res.send("updated report :" + req.params.id + " to be Completed ! , Happy to help")
    })
    })

    
})
//Update specific report number of allowed officers (default is one officer)
app.get('/reportsallowedoff/:id', (req,res)=>{

    //check if there are any available officers
    let sql3 = `SELECT * FROM police_officers WHERE Status='free'`; 
    let query3 = db.query(sql3,(err,results)=>{
        if(err) throw err;
        let freeofficers = [];
        results.forEach(element => {
            freeofficers.push(element)
           
    });
    if(freeofficers.length>0)
    {
        let sql = `UPDATE reports SET Number_of_officers_allowed = Number_of_officers_allowed+1  WHERE id = ${req.params.id}`; 
                let query = db.query(sql,(err,results)=>{
                if(err) throw err;

                let listofficerssql = 'SELECT * FROM police_officers';
                let query1 = db.query(listofficerssql,(err,result)=>{
                if(err) throw err;
                let listofficersarray = [];
                result.forEach(element => {
                listofficersarray.push(element)
                });

                for (let i = 0 ; i<listofficersarray.length ; i++)
                {   

                if(listofficersarray[i].Status == "free")
                {

                let sql = `UPDATE police_officers SET Status = 'In a Case' WHERE id = ${listofficersarray[i].id}`; //changing the assigned police office status to be in a case
                let query = db.query(sql,(err,result)=>{
                if(err) throw err;

                })
                let join_table_record = {officer_name:listofficersarray[i].Full_Name,Case_id:req.params.id};

                let sql2 = 'INSERT INTO report_officer_assign SET ?'; //the "?" works as a place holder in sql
                let query2 = db.query(sql2,join_table_record,(err,result)=>{
                if(err) throw err;

                })


                break;
                }


                }
                })


                res.send("updated report :" + req.params.id + " to have 1 extra officer to be assigned !");

                })
                    }else{
                        res.send("Sorry general , all the officers are busy for the call of the duty !");
                    }
                    })
    

})



app.listen('3000', ()=>{

    console.log("server started on port 3000")
});