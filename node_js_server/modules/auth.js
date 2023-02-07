const { sqlClientPromise } = require("./sql");

module.exports = async function (req, res, next) {

    const userId = req.headers["userid"];
    const password = req.headers["password"];

	const sql = await sqlClientPromise;

    const { rows } = await sql.query(`
        SELECT Count(Patients.patientId) FROM Patients
        WHERE Patients.patientId = '${userId}' AND Patients.password = '${password}';
    `);

    check(userId, password).then((res) => {
        if (res) {
            return next();
        } else {
            var err = new Error('Not authorized! Go back!');
            err.status = 401;
            // console.log("err")
            return next(err);
        }
    })

}

async function check(userId, password) {
    console.log(userId, password)
    return true;
}