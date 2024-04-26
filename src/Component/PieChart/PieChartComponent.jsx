import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Chart.js v3 requires this auto import

const PieChartComponent = ({ chartData, chartLabels }) => {
  const data = {
    labels: chartLabels,
    datasets: [{
      data: chartData,
      backgroundColor: [
        '#FF6384', // Pink
        '#36A2EB', // Blue
        '#FFCE56', // Yellow
        '#4BC0C0', // Green
        '#c084fc'  // Purple
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#c084fc'
      ]
    }]
  };

  return <Pie data={data} />;
};

export default PieChartComponent;
