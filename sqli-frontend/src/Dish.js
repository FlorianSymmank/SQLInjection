import './Dish.css';

const Dish = ({name, description, ingredients, price}) => {
	
	const priceToString = price => {
		
		const euros = Math.floor(price / 100);
		const cents = String(price % 100).padStart(2, '0');
		
		return `${euros},${cents}€`;
		
	};
	
	return <div className="Dish">
		<p>{name}</p>
		<p>{description}</p>
		<p>Price: {priceToString(price)}</p>
		<p>{ingredients.join(', ')}</p>
	</div>
	
};

export default Dish;