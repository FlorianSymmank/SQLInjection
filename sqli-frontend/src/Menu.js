import './Menu.css';
import Dish from './Dish';
import {useState} from 'react';
import {apiCall, useAsyncEffect} from './util';

const Menu = ({date, patientName}) => {
	
	const [dishes, setDishes] = useState(null);
	
	useAsyncEffect(async () => {
		
		const menu = await apiCall(patientName === null ? `menu/${date}` : `menu/${date}?name=${patientName}`);
		setDishes(menu.dishes);
		
	}, [date, patientName]);
	
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