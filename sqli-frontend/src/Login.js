import {useState} from 'react';

const Login = ({setLoginData}) => {
	
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	
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
		
		setLoginData(loginData);
		
	};
	
	const skip = () => {
		
		setLoginData({
			isGuest: true
		});
		
	};
	
	return <>
		<h2>Login</h2>
		Enter name to login:
		<input value={name} onChange={handleNameChange} />
		Enter password:
		<input value={password} onChange={handlePasswordChange} />
		<button onClick={login}>Login</button>
		<button onClick={skip}>Continue as guest</button>
	</>;
	
};

export default Login;