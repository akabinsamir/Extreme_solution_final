const ReportRouter = require('../Routes/report');
const ReportlistRouter = require('../Routes/reportlist');
const listbyidRouter = require('../Routes/listbyid');
const listreportofficers = require('../Routes/listreportofficers');
const officersallowed = require('../Routes/officersallowed');
const completed = require('../Routes/completed');



module.exports = function (app) {
    app.use("/report", ReportRouter);
    app.use("/report", ReportlistRouter);
    app.use("/report", listbyidRouter);
    app.use("/report", listreportofficers);
    app.use("/report", officersallowed);
    app.use("/report", completed);



};