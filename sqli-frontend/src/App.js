import './App.css';
import MainContent from './MainContent';
import Login from './Login';
import {useState} from 'react';

const App = () => {
	
	const [loginData, setLoginData] = useState(undefined);
	
	return (
		<div className="App">
			<header className="App-header">
				Hospital Canteen Menu
			</header>
			<div className="App-main-content">
				{loginData === undefined ?
					<Login setLoginData={setLoginData} />
				:
					<MainContent loginData={loginData} />
				}
			</div>
		</div>
	);
}

export default App;