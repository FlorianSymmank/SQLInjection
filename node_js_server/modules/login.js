const { sqlClientPromise } = require("./sql");

const login = async (req, res) => {
	
	try {
		
		const [_, sqlHospital] = await sqlClientPromise;
		
		const name = req.headers["patientname"];
		const password = req.headers["password"];
		
		const {rows} = await sqlHospital.query(`
			SELECT patientId, name FROM Patients
				WHERE name='${name}' AND pwd='${password}';
		`);
		
		if (rows.length === 0) {
			
			res.json({
				success: false
			});
			res.end();
			
			return;
			
		}
		
		const patient = rows.map(({patientid, name}) => ({
			id: patientid,
			name
		}));
		
		console.log(patient);
		
		res.json({
			success: true,
			patient
		});
		res.send();
		res.end();
		
	} catch (error) {
		
		res.status(500);
		res.send(error.stack);
		res.end();
		
	}
	
};

module.exports = {
	login
};