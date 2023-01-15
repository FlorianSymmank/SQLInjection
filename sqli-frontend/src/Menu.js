import './Menu.css';
import Dish from './Dish';
import { useState } from 'react';
import { apiCall, useAsyncEffect } from './util';

const Menu = ({ date }) => {

	const [dishes, setDishes] = useState(null);

	useAsyncEffect(async () => {
		const menu = await apiCall(`menu/${date}`);
		setDishes(menu.dishes);

	}, [date]);

	return <div>
		<div>
			Angriff -> localhost:3001/api/menu/2023-01-04'--<br />
			# normalerweise werden secret dishes versteckt, comment hebelt check aus
		</div>

		{dishes === null ?
			<p>Loading...</p>
			:
			dishes.map(dish =>
				<Dish key={dish.dishid} name={dish.name} price={dish.price} allergens={dish.allergens} />
			)
		}
	</div>

};

export default Menu;