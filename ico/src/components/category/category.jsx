import './style.scss';
import Item from '../item/item';

function Category({category, categoryName}) {

	return (
		<section className='category'>
			<div className='titleContainer'>
				<h2>{categoryName}</h2>
				<div className='btnAdd'>
					<span>+</span>
				</div>
			</div>

			<div>
				<Item category={category}/>
			</div>

		</section>
	);
}

export default Category;