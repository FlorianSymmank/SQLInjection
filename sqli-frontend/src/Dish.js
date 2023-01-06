import './Dish.css';

const Dish = ({name, price, allergens}) => {
	
	return <div className="Dish">
		<p>{name}</p>
		<p>Price: {price.substring(1).replace('.', ',')}€</p>
		<p>{allergens.join(', ')}</p>
	</div>
	
};

export default Dish;