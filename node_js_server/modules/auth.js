const { sqlClientPromise } = require("./sql");

module.exports = async function (req, res, next) {
	
	//has header guest, if not patientid header wont be set and cant be accessed
	if (req.headers["guest"] === "true")
		return next();
	
	try {
		
		const [sqlCanteen, sqlHospital] = await sqlClientPromise;
		
		const patientname = req.headers["patientname"];
		const password = req.headers["password"];
		
		const { rows } = await sqlHospital.query(`
			SELECT Patients.patientId FROM Patients
			WHERE Patients.name = '${patientname}' AND Patients.pwd = '${password}';
		`);
		
		if (rows.length > 0) {
			req.headers["patientid"] = rows[0].patientid;
			res.set("patientid", rows[0].patientid);
			
			return next();
		} else {
			const err = new Error('Not authorized!');
			err.status = 401;
			return next(err);
		}
		
	} catch (error) {
		
		res.status(500);
		res.json(error.stack);
		res.end();
		
	}
	
}