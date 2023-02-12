import './Login.css';
import {useState} from 'react';
import {apiCall} from './util';

const Login = ({setLoginData}) => {
	
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [loginFailed, setLoginFailed] = useState(false);
	
	const handleNameChange = event => {
		
		setName(event.target.value);
		
	};
	
	const handlePasswordChange = event => {
		
		setPassword(event.target.value);
		
	};
	
	const login = async () => {
		
		const loginData = {
			name,
			password,
			isGuest: false
		};
		
		const result = await apiCall(`login`, loginData);
		
		if (result.success) {
			
			setLoginData(loginData);
			setLoginFailed(false);
			
		} else {
			
			setLoginFailed(true);
			
		}
		
	};
	
	const skip = () => {
		
		setLoginData({
			isGuest: true
		});
		
	};
	
	const handleKeyDown = event => {
		
		if (event.key === 'Enter')
			login().catch(err => console.error(err));
		
	};
	
	return <>
		<div>
			<h2>Login</h2>
			<input value={name} onChange={handleNameChange} onKeyDown={handleKeyDown} placeholder='Name' />
			<br />
			<input value={password} onChange={handlePasswordChange} onKeyDown={handleKeyDown} type="password" placeholder='Password' />
			<br />
			<br />
			<button onClick={login}>Login</button>
			<button onClick={skip}>Continue as guest</button>
			<br />
			<br />
			<div className={loginFailed ? 'error-message' : 'error-message hidden'}>The credentials you provided are incorrect.</div>
		</div>
	</>;
	
};

export default Login;