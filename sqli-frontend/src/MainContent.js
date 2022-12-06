import './MainContent.css';
import {useState} from 'react';
import Menu from './Menu';

const MainContent = () => {
	
	const [date, setDate] = useState(new Date());
	
	const handleChange = event => {
		
		if (event.target.value === '')
			return;
		
		setDate(new Date(event.target.value));
		
	};
	
	const dateToString = date => date.toISOString().split('T')[0];
	
	return (
		<div className="MainContent">
			<span>Canteen Menu for {date.toDateString()}</span>
			<input type="date" value={dateToString(date)} onChange={handleChange} />
			<Menu date={dateToString(date)} />
		</div>
	);
}

export default MainContent;