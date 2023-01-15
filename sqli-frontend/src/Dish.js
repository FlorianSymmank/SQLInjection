import './Dish.css';

const Dish = ({ name, price, allergens, allergicReaction }) => {

	let className = "Dish " + (allergicReaction ? "allergic" : "");

	// {price.substring(1).replace('.', ',')}€ ? bei mir reicht {price} für ne ordentlich ausgabe
	return <div className={className}>
		<p>{name}</p>
		<p>Price: {price.substring(1).replace('.', ',')}€</p>
		<p>{allergens.join(', ')}</p>
	</div>

};

export default Dish;