import './styles/App.scss';

import { useEffect, useState } from 'react';

import Category from './components/category/category';

import { getCategories } from '../client/fakeClient.js';
import { sumOf } from './utils.js';

function App() {

	const [total, setTotal] = useState(0);
	const [categories, setCategories] = useState([]);
	const [lines, setLines] = useState([]);

	const calc = (category, lines) => {
		setLines(prev => prev.map((x, c) => category == c ? lines : x));
	}

	useEffect(() => {
		getCategories().then(setCategories);
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
		<section>
			<h1>ICO²</h1>

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
			<section>
				Total : { Math.round(total) }
			</section>
		</section>
	);
}

export default App;