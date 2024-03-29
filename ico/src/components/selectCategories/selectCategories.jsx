import './style.scss';

import { useEffect, useState } from 'react';

import { getCategories } from '/client/fakeClient.js';

function SelectCategories({onSelect}) {
	const [categories, setCategories] = useState([]);

	const handleCheck = id => 
		setCategories(prev => prev.map(c => c.id == id ? {...c, checked: !c.checked}: c));

	useEffect(() => {
		const loadedCategories = JSON.parse(sessionStorage.getItem('categories'));

		getCategories()
		.then(data => setCategories(
			data.map(c => ({...c, checked: loadedCategories?.find(x => x.id == c.id)?.checked ?? false}))
				.sort((a,b) => a.order - b.order)
		));
	}, []);

	useEffect(() => {
		onSelect(categories);
		if(categories.length > 0) sessionStorage.setItem('categories', JSON.stringify(categories));
	}, [categories]);

	return (
		<section className='selectCategories'>
			{ 
				categories.map(c => 
					<label key={c.id}>
						<input
							type="checkbox"
							checked={c.checked}
							onChange={() => handleCheck(c.id)}
						/>
						{c.name}
					</label>
				)
			}
		</section>
	)
}

export default SelectCategories;