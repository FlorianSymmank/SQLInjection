import {useState} from 'react';

const Login = ({setPatientName}) => {
	
	const [name, setName] = useState('');
	
	const handleNameChange = event => {
		
		setName(event.target.value);
		
	};
	
	const login = () => {
		
		setPatientName(name);
		
	};
	
	const skip = () => {
		
		setPatientName(null);
		
	};
	
	return <>
		<h2>Login</h2>
		Enter name to login:
		<input value={name} onChange={handleNameChange} />
		<button onClick={login}>Login</button>
		<button onClick={skip}>Continue as guest</button>
	</>;
	
};

export default Login;