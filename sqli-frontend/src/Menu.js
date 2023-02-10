import './Menu.css';
import Dish from './Dish';
import {useState} from 'react';
import {apiCall, useAsyncEffect} from './util';

const Menu = ({date, loginData}) => {
	
	const [dishes, setDishes] = useState(null);
	
	useAsyncEffect(async () => {
		
		const menu = await apiCall(`menu/${date}`, loginData);
		setDishes(menu.dishes);
		
	}, [date, loginData]);
	
	return <>
		{dishes === null ?
			<p>Loading...</p>
			:
			dishes.map(dish =>
				<Dish key={dish.dishid} name={dish.name} price={dish.price} allergens={dish.allergens} allergicReaction={dish.allergicReaction} />
			)
		}
	</>;
	
};

export default Menu;