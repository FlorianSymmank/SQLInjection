const { sqlClientPromise } = require("./sql");

module.exports = async function (req, res, next) {

    const patientId = req.headers["patientid"];
    const password = req.headers["password"];

    const [sqlCanteen, sqlHospital] = await sqlClientPromise;

    const { rows } = await sqlHospital.query(`
        SELECT Count(Patients.patientId) FROM Patients
        WHERE Patients.patientId = ${patientId} AND Patients.pwd = '${password}';
    `);

    if (rows[0].count > 0) {
        return next();
    } else {
        var err = new Error('Not authorized!');
        err.status = 401;
        return next(err);
    }
}