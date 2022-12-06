const getMenu = (req, res) => {
	
	const menu = {
		dishes: [
			{
				name: 'Chicken noodle casserole',
				description: 'Very tasty',
				ingredients: [
					'chicken',
					'noodles'
				],
				price: 299
			},
			{
				name: 'Salad',
				description: 'Green',
				ingredients: [
					'salad'
				],
				price: 109
			}
		]
	};
	
	res.json(menu);
	res.end();
	
};

module.exports = {
	getMenu
};