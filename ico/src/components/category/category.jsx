import './style.scss';

import { useRef, useState } from 'react';

import Item from '../item/item';

function Category({category, categoryName}) {

	const [lines, setLines] = useState([]);

	const addLine = () => setLines(prev => [...prev, { total: 0 }]);

	const removeLine = index => {
		setLines(prev => prev.filter((_, i) => i !== index));
	};

	return (
		<section className='category'>
			<div className='titleContainer'>
				<h2>{categoryName}</h2>
				<div className='btnAdd' onClick={addLine}>
					<span>+</span>
				</div>
			</div>

			<div class="categoryItems">
				{
					lines.map((_, i) => 
						<Item 
							key={i} 
							category={category}
							onRemove={() => removeLine(i)} 
						/>
					)
				}
			</div>

		</section>
	);
}

export default Category;