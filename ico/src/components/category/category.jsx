import './style.scss';

function Category({categoryName}) {

	return (
		<section className='category'>
			<div className='titleContainer'>
				<h2>{categoryName}</h2>
				<div className='btnAdd'>
					<span>+</span>
				</div>
			</div>

		</section>
	);
}

export default Category;