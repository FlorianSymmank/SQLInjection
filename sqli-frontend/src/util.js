import {useEffect} from 'react';

const apiCall = async (location) => {
	
	const response = await fetch(`/api/${location}`, {
		headers: {
			'Accept': 'application/json'
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