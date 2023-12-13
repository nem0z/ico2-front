import './style.scss';

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

import PieChart from './chart';

import { sumOf } from '/src/utils.js';
import { methodText } from '/src/var.js';

Chart.register(CategoryScale);

function PDF({data, forwardRef}) {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const labels = Object.keys(data);
    const values = Object.entries(data).map(([_, v]) => sumOf(v, 'total'));

	return (
		<section className='export' ref={forwardRef}>
            <section className='exportHeader'>
                <h1>Export chiffrage carbone ICO²</h1>

                <img src="/img/ortec.png" alt="logo ortec group" height={200}/>
            </section>

            <p>{methodText}</p>

            <section className='graph'>
                <PieChart className='pieChartComponent' labels={labels} values={values} />
            </section>

            <p></p>
		</section>
	);
}

export default PDF;