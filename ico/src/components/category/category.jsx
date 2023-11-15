import './style.scss';

import { useEffect, useRef, useState } from 'react';

import Item from '../item/item';

function Category({category, categoryName}) {

	const [lines, setLines] = useState([{ total: 0 }]);
	const btnAdd = useRef(null);

	useEffect(() => {
		const handler = () => setLines(prev => [...prev, { total: 0 }]);
		btnAdd.current?.addEventListener('click', handler);
		
		return () => btnAdd.current?.removeEventListener('click', handler);
	}, []);

	return (
		<section className='category'>
			<div className='titleContainer'>
				<h2>{categoryName}</h2>
				<div className='btnAdd' ref={btnAdd}>
					<span>+</span>
				</div>
			</div>

			<div>
				{
					lines.map((_, i) => <Item key={i} category={category}/>)
				}
			</div>

		</section>
	);
}

export default Category;