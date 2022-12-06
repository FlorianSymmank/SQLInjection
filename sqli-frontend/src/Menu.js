import './Menu.css';
import Dish from './Dish';
import {useState} from 'react';
import {apiCall, useAsyncEffect} from './util';

const Menu = ({date}) => {
	
	const [dishes, setDishes] = useState(null);
	
	useAsyncEffect(async () => {
		
		console.log('a');
		const menu = await apiCall(`menu/${date}`);
		
		setDishes(menu.dishes);
		
	}, [date]);
	
	return <div>
		{dishes === null ? 
			<p>Loading...</p>
		: dishes.map(dish =>
			<Dish name={dish.name} description={dish.description} ingredients={dish.ingredients} price={dish.price} />
		)}
	</div>
	
};

export default Menu;