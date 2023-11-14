import './styles/App.scss';
import Category from './components/category/category';

function App() {

	return (
		<section>
			<h1>ICO²</h1>

			<section>
				
				<Category categoryName={"Staff"} />
				<Category categoryName={"Engins - Outils"} />
				<Category categoryName={"Consommable"} />
				<Category categoryName={"Installation"} />
				<Category categoryName={"Energie"} />
				<Category categoryName={"Materiaux"} />
				<Category categoryName={"Transport"} />

			</section>
		</section>
	);
}

export default App;