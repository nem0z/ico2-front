import './styles/App.scss';
import Category from './components/category/category';

function App() {

	return (
		<section>
			<h1>ICO²</h1>

			<section>
				
				<Category category={"staff"} categoryName={"Staff"} />
				<Category category={"engins-outils"} categoryName={"Engins - Outils"} />
				<Category category={"consommable"} categoryName={"Consommable"} />
				<Category category={"installation"} categoryName={"Installation"} />
				<Category category={"energie"} categoryName={"Energie"} />
				<Category category={"materaux"} categoryName={"Materiaux"} />
				<Category category={"transport"} categoryName={"Transport"} />

			</section>
		</section>
	);
}

export default App;