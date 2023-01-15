import './MainContent.css';
import { useState } from 'react';
import Menu from './Menu';

const MainContent = () => {

	const [date, setDate] = useState(new Date());
	const [patientId, setPatientId] = useState(0);

	const handleDateChange = event => {

		if (event.target.value === '')
			return;
		setDate(new Date(event.target.value));

	};

	const handlePatientIdChange = event => {

		if (event.target.value === '')
			return;

		setPatientId(event.target.value);

	};

	const dateToString = date => date.toISOString().split('T')[0];

	return (
		<div className="MainContent">
			<div>
				<span>Canteen Menu for {date.toDateString()}</span>
				<input type="date" value={dateToString(date)} onChange={handleDateChange} />
			</div>
			<div>
				<span>Patient: <input type="number" value={patientId} onChange={handlePatientIdChange} /></span>

			</div>
			<Menu date={dateToString(date)} patientId={patientId} />
		</div>
	);
}

export default MainContent;