import './style.scss';

import { useEffect, useRef, useState } from 'react';

import { getFe, getFeUnits } from '../../../client/fakeClient.js';

function Item({category, onRemove, onCalc}) {

	const labelRef = useRef(null);

	const [fe, setFe] = useState([]);
	const [feSelected, setFeSelected] = useState(null);
	const [feValue, setFeValue] = useState(0);
	const [qty, setQty] = useState(1);
	const [total, setTotal] = useState(0);


	const [feUnits, setFeUnits] = useState([]);

	useEffect(() => {
		getFe(category).then(setFe);
	}, []);

	useEffect(() => {
		if(!feSelected) return;

		getFeUnits(feSelected)
			.then(data => {
				setFeUnits(data);
				setFeValue(data[0]?.value);
			});
	}, [feSelected]);

	useEffect(() => {
		setTotal(parseFloat(feValue) * parseFloat(qty));
	}, [feValue, qty]);

	const calc = () => {
		const res = feRef.current?.value ?? 0 * qtyRef.current?.value ?? 0;
		onCalc(res);
	};

	return (
		<section className='item'>
			<input type="text" id="label" placeholder='Libellé de la ligne' ref={labelRef} />

			<select id="fe" onChange={e => setFeSelected(e.target.value)}>
				<option value="">---</option>
				{
					fe.map(x =>
						<option key={x.id} value={x.id}>{x.label}</option>
					)
				}
			</select>

			<select id="unit" onChange={e => setFeValue(e.target.value)}>
				{
					feUnits.length > 0 ?
					feUnits.map(x =>
						<option key={x.unit} value={x.value}>{x.unit}</option>
					) : <option value="">---</option>
				}
			</select>

			<input type="text" id="feValue" value={`${feValue} k.co²`} readOnly />

			<input type="text" id="qty" defaultValue="1" onChange={e => setQty(e.target.value)} />

			<input type="text" id="total" value={`${total} k.co²`} onChange={calc} readOnly />

			<button className="btnRemove" type="button" onClick={onRemove}>X</button>
		</section>
	);
}

export default Item;