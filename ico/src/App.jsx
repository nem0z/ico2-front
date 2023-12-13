import './styles/App.scss';

import { useEffect, useState } from 'react';

import { usePDF } from 'react-to-pdf';

import Category from './components/category/category';
import SelectCategories from './components/selectCategories/selectCategories';
import PdfExport from './components/export/pdf';

import { sumOf } from '/src/utils.js';
import { unitCo2 } from '/src/var.js';

function App() {

	const [total, setTotal] = useState(0);
	const [selectKey, setSelectKey] = useState(1);
	const [categories, setCategories] = useState([]);
	const [lines, setLines] = useState([]);

	const { toPDF, targetRef } = usePDF({filename: 'export.pdf'});

	const calc = (category, updatedLines) =>
		setLines(prev => prev.map((x, c) => category == c ? updatedLines : x));

	const getPdfData = () => Object.fromEntries(categories.filter(c => c.checked).map(c => [c.name, lines[c.id]]));

	const resetForm = () => {
		if(!confirm("Êtes-vous de vouloir réinitialiser le formulaire ?")) return;

		// reset values in sessionStorage
		sessionStorage.removeItem("lines");
		sessionStorage.removeItem("categories");

		// force selectCategories to re-render and trigger app reload
		setSelectKey(prev => prev+1);
	}
		
	useEffect(() => {
		if(categories.length <= 0) return setLines(JSON.parse(sessionStorage.getItem('lines')) ?? []);
		setLines(prev => categories.map((_, index) => prev[index] || []));
	}, [categories.length]);

	useEffect(() => {
		if(categories.length <= 0) return;

		setTotal(
			Array.from(lines.entries()).reduce((acc, [i, v]) => {
				return acc + (categories.find(c => c.id == i) ? sumOf(v, "total") : 0);
			}, 0)
		);
		sessionStorage.setItem("lines", JSON.stringify(lines));

	}, [lines, categories]);

	return (
		<section className='ICO'>
			<section className='appHeader'>
				<h1>
					<span className='bold'> I</span>mpact 
					<span className='bold'> C</span>arbon 
					<span className='bold'> O</span>rtec 
					<span className='bold'> O</span>ptimization 
					<span className='bold'> (ICO²)</span>
				</h1>

				<button onClick={resetForm}>Reset</button>
			</section>

			<SelectCategories onSelect={setCategories} key={selectKey} />


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

			<section className='result'>
				<section className='total'>
					<p><span className='bold'>{ Math.round(total) }</span> {unitCo2}</p>
				</section>

				<button className='btnExportPdf' onClick={toPDF}>Export PDF</button>
			</section>

			

			<section className='exportWrapper'>
				<PdfExport data={getPdfData()} forwardRef={targetRef} />
			</section>

		</section>
	);
}

export default App;