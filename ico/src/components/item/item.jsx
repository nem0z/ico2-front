import './style.scss';

import { useEffect, useRef, useState } from 'react';

import { getFe, getFeUnits } from '/client/fakeClient.js';

import { unitCo2 } from '/src/var.js';

function Item({category, parentItem, onRemove, onCalc}) {

	const [label, setLabel] = useState(parentItem.label);
	const [fe, setFe] = useState([]);
	const [feSelected, setFeSelected] = useState(parentItem.fe);
	const [feValue, setFeValue] = useState(parentItem.feValue);
	const [qty, setQty] = useState(parentItem.qty);
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
		setTotal((parseFloat(feValue) || 0) * (parseFloat(qty) || 0));
	}, [feValue, qty]);

	useEffect(() => {
		onCalc({ label: label, fe: feSelected, feValue: feValue, qty: qty, total: total });
	}, [label, total]);

	return (
		<section className='item'>
			<input type="text" id="label" placeholder='Libellé de la ligne' onChange={e => setLabel(e.target.value)} value={label} />

			<select id="fe" onChange={e => setFeSelected(e.target.value)} value={feSelected} >
				<option value="">---</option>
				{
					fe.map(x => <option key={x.id} value={x.id}>{x.label}</option>)
				}
			</select>

			<input type="text" id="qty" onChange={e => setQty(e.target.value)} value={qty} />

			<select id="unit" onChange={e => setFeValue(e.target.value)} value={feValue}>
				{
					feUnits.length > 0 ?
					feUnits.map(x =>
						<option key={x.unit} value={x.value}>{x.unit}</option>
					) : <option value="">---</option>
				}
			</select>

			<input type="text" id="total" value={`${Math.round(total)} ${unitCo2}`} readOnly />

			<button className="btnRemove" type="button" onClick={onRemove}>X</button>
		</section>
	);
}

export default Item;