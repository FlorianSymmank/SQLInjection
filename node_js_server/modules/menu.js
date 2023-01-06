const {sqlClientPromise} = require("./sql");

const getMenu = async (req, res) => {
	
	const date = req.params.date;
	
	const sql = await sqlClientPromise;
	
	const {rows} = await sql.query(`
		SELECT Dishes.dishId, Dishes.name, Dishes.price FROM Menu, Dishes
			WHERE Menu.dishId = Dishes.dishId AND Menu.date = '${date}';
	`);
	
	const dishes = await Promise.all(rows.map(async ({dishid, name, price}) => {
		
		const {rows} = await sql.query(`
			SELECT allergen FROM DishAllergen
				WHERE dishId='${dishid}'
		`);
		
		const allergens = rows.map(({allergen}) => allergen);
		
		return {
			name,
			price,
			allergens
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