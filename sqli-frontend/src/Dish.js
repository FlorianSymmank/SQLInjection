import './Dish.css';

const Dish = ({name, price, allergens}) => {
	

	// {price.substring(1).replace('.', ',')}€ ? bei mir reicht {price} für ne ordentlich ausgabe
	return <div className="Dish">
		<p>{name}</p>
		<p>Price: {price.substring(1).replace('.', ',')}€</p>
		<p>{allergens.join(', ')}</p>
	</div>
	
};

export default Dish;