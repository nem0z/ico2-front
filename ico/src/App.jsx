import './styles/App.scss';

import { useEffect, useState } from 'react';

import Category from './components/category/category';
import SelectCategories from './components/selectCategories/selectCategories';

import { sumOf } from '/src/utils.js';
import { unitCo2 } from '/src/var.js';

function App() {

	const [total, setTotal] = useState(0);
	const [categories, setCategories] = useState([]);
	const [lines, setLines] = useState([]);

	const calc = (category, updatedLines) =>
		setLines(prev => prev.map((x, c) => category == c ? updatedLines : x));
		
	useEffect(() => {
		const storedLines = JSON.parse(sessionStorage.getItem('lines')) || [];
		setLines(categories.map((_, index) => storedLines[index] || []));
	}, [categories.length]);

	useEffect(() => {
		setTotal(
			Array.from(lines.entries()).reduce((acc, [i, v]) => {
				return acc + (categories.find(c => c.id == i) ? sumOf(v, "total") : 0);
			}, 0)
		);

	}, [lines, categories]);

	return (
		<section className='ICO'>
			<h1>
				<span className='bold'> I</span>mpact 
				<span className='bold'> C</span>arbon 
				<span className='bold'> O</span>rtec 
				<span className='bold'> O</span>ptimization 
				<span className='bold'> (ICO²)</span>
			</h1>

			<SelectCategories onSelect={setCategories} />

			<section>
				{
					categories.map(c =>
						c.checked ?
						<Category 
							key={c.id} 
							category={c.id} 
							categoryName={c.name} 
							appLines={lines[c.id] || []}
							onCalc={lines => calc(c.id, lines)}
						/>
						: null
					)
				}
			</section>

			<section className='total'>
				<p><span className='bold'>{ Math.round(total) }</span> {unitCo2}</p>
			</section>
		</section>
	);
}

export default App;