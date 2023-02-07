const { sqlClientPromise } = require("./sql");

const getMenu = async (req, res) => {

	try {

		const date = req.params.date;
		const patientId = req.headers["patientid"];

		const [sqlCanteen, sqlHospital] = await sqlClientPromise;

		let allergicTo = []
		if (patientId != undefined) {
			// cross db query to check if patient is allergic to ingredient
			const result = await sqlHospital.query(`
			SELECT patientId, allergen FROM PatientAllergen WHERE patientId=${patientId}
		`);

			allergicTo = result.rows;
		}

		const { rows } = await sqlCanteen.query(`
			SELECT Dishes.dishId, Dishes.name, Dishes.price FROM Menu, Dishes
				WHERE Menu.dishId = Dishes.dishId AND Menu.date = '${date}' AND NOT Menu.secret;
		`);

		const dishes = await Promise.all(rows.map(async ({ dishid, name, price }) => {

			const { rows } = await sqlCanteen.query(`
				SELECT allergen FROM DishAllergen
					WHERE dishId='${dishid}'
			`);

			const allergens = rows.map(({ allergen }) => allergen);
			const allergicReaction = allergicTo.some(v => allergens.includes(v.allergen));

			return {
				dishid,
				name,
				price,
				allergens,
				allergicReaction
			};

		}));

		res.json({
			dishes
		});

		res.status(200);
		res.end();

	} catch (error) {

		res.status(500);
		res.json(error);
		res.end();

	}

};

module.exports = {
	getMenu
};