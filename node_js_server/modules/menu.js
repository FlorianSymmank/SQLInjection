const { sqlClientPromise } = require("./sql");

const getMenu = async (req, res) => {
	
	const date = req.params.date;
	const patientId = req.params.patientId;
	
	const [sqlCanteen, sqlHospital] = await sqlClientPromise;
	
	// cross db query to check if patient is allergic to ingredient
	const result = await sqlHospital.query(`
		SELECT patientId, allergen FROM PatientAllergen WHERE patientId=${patientId}
	`);
	
	const allergicTo = result.rows;
	
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
	res.end();
	
};

module.exports = {
	getMenu
};