import React from 'react';

import { Doughnut } from 'react-chartjs-2';

import { sum } from '/src/utils.js';

const genLabels = ({data}) =>
    data.labels.map((label, i) => {
        const dataset = data.datasets[0];
        const value = dataset.data[i];
        const total = sum(dataset.data);
        const percentage = ((value / total) * 100).toFixed(2) + '%';

        return {
            text: `${label} - ${percentage}`,
            fillStyle: dataset.backgroundColor[i],
            index: i,
        };
    });

const PieChart = ({title, labels, values}) => {

    const data = {
        labels: labels,
        datasets: [{
                data: values,
                backgroundColor: null,
                borderWidth: 1,
            }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
  
        plugins: {
            legend: {
                position: 'right',
                onClick: null,
                labels: {
                    generateLabels: genLabels,
                    padding: 15,
                    font: {
                        size: 20,
                    },
                },
            },
            title: {
                display: true,
                text: title || "Répartition impact carbone par catégorie de postes d'émissions",
                position: 'bottom',
                padding: 30,
                font: {
                    size: 35,
                    weight: 'bold',
                },
            },
        },
        cutout: '35%',
        hoverOffset: 5,
    };

    return <Doughnut height={600} data={data} options={options} className='pieChart' />;
};

export default PieChart;