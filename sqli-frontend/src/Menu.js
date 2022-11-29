import './Menu.css';
import Dish from './Dish';

const Menu = ({date}) => {
	
	const dishes = [
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
	];
	
	return <div>
		{dishes.map(dish =>
			<Dish name={dish.name} description={dish.description} ingredients={dish.ingredients} price={dish.price} />
		)}
	</div>
	
};

export default Menu;