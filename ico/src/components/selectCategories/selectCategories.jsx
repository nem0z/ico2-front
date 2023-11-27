import './style.scss';

import { useEffect, useState } from 'react';

import { getCategories } from '/client/fakeClient.js';

function SelectCategories({onSelect}) {
	const [categories, setCategories] = useState([]);

	const handleCheck = id => 
		setCategories(prev => prev.map(c => c.id == id ? {...c, checked: !c.checked}: c));

	useEffect(() => {
		getCategories()
		.then(data => setCategories(
			data.map(c => ({...c, checked: false}))
			.sort((a,b) => a.order - b.order)
		));
	}, []);

	useEffect(() => {
		onSelect(categories.filter(c => c.checked));
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