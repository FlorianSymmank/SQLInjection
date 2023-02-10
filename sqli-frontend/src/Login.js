import './Login.css';
import { useState } from 'react';
import { apiCall } from './util';

const Login = ({ setLoginData }) => {

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

		try {
			// test if credentials are correct, throws if not
			await apiCall(`menu/2023-01-01`, loginData);
			setLoginData(loginData);
			setLoginFailed(false)
		} catch (e) {
			setLoginFailed(true)
		}
	};

	const skip = () => {

		setLoginData({
			isGuest: true
		});

	};

	return <>
		<div>
			<h2>Login</h2>
			<input value={name} onChange={handleNameChange} placeholder='Name' />
			<br />
			<input value={password} onChange={handlePasswordChange} type="password" placeholder='Password' />
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