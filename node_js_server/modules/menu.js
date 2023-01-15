const { sqlClientPromise } = require("./sql");

const getMenu = async (req, res) => {

	const date = req.params.date;
	const patientId = req.params.patientId;

	const sql = await sqlClientPromise;

	// cross db query to check if patient is allergic to ingredient
	const result = await sql.query(`
		SELECT patientId, allergen FROM dblink('host=localhost user=canteen password=gNXY=qfn4B dbname=hospital_db', 'SELECT patientId, allergen FROM PatientAllergen WHERE patientId=${patientId}') as (patientID int, allergen text);
	`);
	const allericTo = result.rows;

	const { rows } = await sql.query(`
		SELECT Dishes.dishId, Dishes.name, Dishes.price FROM Menu, Dishes
			WHERE Menu.dishId = Dishes.dishId AND Menu.date = '${date}' AND NOT Menu.secret;
	`);

	const dishes = await Promise.all(rows.map(async ({ dishid, name, price }) => {

		const { rows } = await sql.query(`
			SELECT allergen FROM DishAllergen
				WHERE dishId='${dishid}'
		`);

		const allergens = rows.map(({ allergen }) => allergen);
		const allergicReaction = allericTo.some(v => allergens.includes(v.allergen));

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