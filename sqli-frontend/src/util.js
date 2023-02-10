import {useEffect} from 'react';

const apiCall = async (location, loginData) => {
	
	const response = await fetch(`/api/${location}`, {
		headers: {
			'Accept': 'application/json',
			'patientname': loginData.name,
			'password': loginData.password,
			'guest': `${loginData.isGuest}`
		}
	});
	
	if (!response.ok)
		throw new Error(await response.text());
	
	const contentType = response.headers.get('Content-type');
	
	if (!contentType.startsWith('application/json'))
		throw new Error(`Expected application/json but received ${contentType} in call to ${location}`);
	
	return await response.json();
	
};

const useAsyncEffect = (effect, dependencides) => {
	
	useEffect(() => {
		
		effect().catch(console.error);
		
	}, dependencides);
	
};

export {
	apiCall,
	useAsyncEffect
};