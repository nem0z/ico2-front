import './style.scss';

import { useRef } from 'react';

function Item({category, onCalc}) {

	const labelRef = useRef(null);
	const feRef = useRef(null);
	const unitRef = useRef(null);
	const qtyRef = useRef(null);

	const feValueRef = useRef(null);
	const totalValueRef = useRef(null);

	const calc = () => {
		const res = feRef.current?.value ?? 0 * qtyRef.current?.value ?? 0;
		onCalc(res);
	};

	return (
		<section className='item'>
			<input type="text" id="label" placeholder='Libellé de la ligne' ref={labelRef} />

			<select id="fe" ref={feRef}>
				<option value="">---</option>
				<option value="acier-carbone">Acier carbone</option>
				<option value="acier-inox">Acier inox</option>
				<option value="peinture-huile">Peinture à l'huile</option>
				<option value="chimique">Produit chimique</option>
			</select>

			<select id="unit" ref={unitRef}>
				<option value="kg">Kg</option>
				<option value="euro">Euro (k.Euro)</option>
			</select>

			<input type="text" id="feValue" defaultValue="0.0" ref={feValueRef} readOnly />

			<input type="text" id="qty" defaultValue="1" ref={qtyRef} />

			<input type="text" id="total" defaultValue="0" ref={totalValueRef} onChange={calc} readOnly />
		</section>
	);
}

export default Item;