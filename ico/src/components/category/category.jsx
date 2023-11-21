import './style.scss';

import { useEffect, useState } from 'react';

import Item from '/src/components/item/item';
import { sumOf } from '/src/utils.js';


function Category({category, categoryName, onCalc}) {

	const [lines, setLines] = useState([]);
	const [total, setTotal] = useState(0);

	const addLine = () => setLines(prev => [...prev, { total: 0 }]);

	const removeLine = index => setLines(prev => prev.filter((_, i) => i !== index));

	const handleLine = (index, line) => setLines(prev => prev.map((l, i) => i==index ? line : l));

	useEffect(() => {
		setTotal(sumOf(lines, "total"));

		onCalc(lines);
	}, [lines]);

	return (
		<section className='category'>
			<div className='titleContainer'>
				<h2>{ categoryName }</h2>
				<span>{ Math.round(total) }</span>
				<div className='btnAdd' onClick={addLine}>
					<span>+</span>
				</div>
			</div>

			<div className="categoryItems">
				{
					lines.map((_, i) => 
						<Item 
							key={i} 
							category={category}
							onRemove={() => removeLine(i)}
							onCalc={line => handleLine(i, line)}
						/>
					)
				}
			</div>

		</section>
	);
}

export default Category;