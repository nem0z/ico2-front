import './styles/App.scss';

import { useEffect, useState } from 'react';

import Category from './components/category/category';

import { getCategories } from '../client/fakeClient.js';

function App() {

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		getCategories().then(setCategories);
	}, []);

	return (
		<section>
			<h1>ICO²</h1>

			<section>
				
				{
					categories.map(c => 
						<Category key={c.id} category={c.id} categoryName={c.name} />
					)
				}

			</section>
		</section>
	);
}

export default App;