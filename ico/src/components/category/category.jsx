import './style.scss';

import { useEffect, useState } from 'react';

import Item from '/src/components/item/item';

import { sumOf } from '/src/utils.js';
import { unitCo2 } from '/src/var.js';


function Category({category, categoryName, appLines, onCalc}) {
	
	const [lines, setLines] = useState(appLines);
	const [total, setTotal] = useState(0);

	const addLine = () => setLines(prev => [...prev, { total: 0 }]);
	const removeLine = index => setLines(prev => prev.filter((_, i) => i !== index));
	const handleLine = (index, line) => setLines(prev => prev.map((l, i) => i==index ? line : l));

	useEffect(() => {
		console.log(appLines);
	}, []);

	useEffect(() => {
		setTotal(sumOf(lines, "total"));
		onCalc(lines);
	}, [lines]);

	return (
		<section className='category'>
			<div className='banner'>
				<div className='titleContainer'>
					<h2>{ categoryName }</h2>
					<p><span className='bold'>{Math.round(total)}</span> {unitCo2}</p>
				</div>
				
				<div className='btnAdd' onClick={addLine}>
					<span>+</span>
				</div>
			</div>

			<div className="categoryItems">
				{
					lines.map((v, i) => 
						<Item 
							key={i} 
							category={category}
							parentItem={v}
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