import './MainContent.css';
import { useState } from 'react';
import Menu from './Menu';

const MainContent = ({patientName}) => {
	
	const [date, setDate] = useState(new Date());
	
	const handleDateChange = event => {
		
		if (event.target.value === '')
			return;
		
		setDate(new Date(event.target.value));
		
	};
	
	const dateToString = date => date.toISOString().split('T')[0];
	
	return (
		<div className="MainContent">
			<div>
				<span>Canteen Menu for {date.toDateString()}</span>
				<input type="date" value={dateToString(date)} onChange={handleDateChange} />
			</div>
			<Menu date={dateToString(date)} patientName={patientName} />
		</div>
	);
}

export default MainContent;