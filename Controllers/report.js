const ReportService = require('../Services/report');
const ReportController = {};

ReportController.submitReport = async (req, res) => {
    try {
        const { report, tonesendarray } = await ReportService.submitReport();
        console.log(tonesendarray);
        res.status(200).send('Report submitted for Car ' + report.license_number + ' , Will keep you posted')
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
module.exports = ReportController;
//here 2nd