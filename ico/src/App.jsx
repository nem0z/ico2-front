import './styles/App.scss';

import { useEffect, useState } from 'react';

import Category from './components/category/category';
import SelectCategories from './components/selectCategories/selectCategories';

import { getCategories } from '/client/fakeClient.js';
import { sumOf } from './utils.js';

function App() {

	const [total, setTotal] = useState(0);
	const [categories, setCategories] = useState([]);
	const [lines, setLines] = useState([]);

	const calc = (category, lines) => {
		setLines(prev => prev.map((x, c) => category == c ? lines : x));
	}

	const updateCategories = c => setCategories(c);

	useEffect(() => {
		getCategories().then(categories => 
			setCategories(categories.sort((a,b) => a.order - b.order))	
		);
	}, []);

	useEffect(() => {
		if(categories.length <= 0) return;

		setLines(Array(Math.max(...categories.map(c => c.id))).fill([]));
	}, [categories]);

	useEffect(() => {
		setTotal(
			Array.from(lines.values()).reduce((acc, v) => {
				return acc + sumOf(v, "total");
			}, 0)
		);
	}, [lines]);

	return (
		<section className='ICO'>
			<h1>
				<span className='bold'> I</span>mpact 
				<span className='bold'> C</span>arbon 
				<span className='bold'> O</span>rtec 
				<span className='bold'> O</span>ptimization 
				<span className='bold'> (ICO²)</span>
			</h1>

			<SelectCategories onSelect={updateCategories} />

			<section>
				{
					categories.map(c => 
						<Category 
							key={c.id} 
							category={c.id} 
							categoryName={c.name} 
							onCalc={lines => calc(c.id, lines)}
						/>
					)
				}
			</section>

			<section className='total'>
				<p><span className='bold'>{ Math.round(total) }</span> k.co²</p>
			</section>
		</section>
	);
}

export default App;