import './App.css';
import MainContent from './MainContent';
import Login from './Login';
import {useState} from 'react';

const App = () => {
	
	const [patientName, setPatientName] = useState(undefined);
	
	return (
		<div className="App">
			<header className="App-header">
				Hospital Canteen Menu
			</header>
			<div className="App-main-content">
				{patientName === undefined ?
					<Login setPatientName={setPatientName} />
				:
					<MainContent patientName={patientName} />
				}
			</div>
		</div>
	);
}

export default App;