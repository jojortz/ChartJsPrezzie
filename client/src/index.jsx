import React from 'react';
const { useState } = React;
import { createRoot } from 'react-dom/client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const line_options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const bar_options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [0, 10, 5, 2, 20, 30, 45],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [4, 13, 3, 21, 30, 45, 20],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const pie_data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const charts = ['Line', 'Bar', 'Pie', 'Test'];

const App = () => {
  const [chart, setChart] = useState(charts[0]);
  return (
    <>
      <h1>Chart JS Prezzie</h1>
      <div className='tab-bar'>
        {charts.map((chartName) => (
          <div
            className='tab'
            onClick={e => {
              e.preventDefault();
              console.log(chartName);
              setChart(chartName);
            }}
            style={{borderBottom: `${chartName === chart ? '2pt solid rgb(53, 162, 235)' : '1pt solid #ddd'}`}}
            >{chartName}</div>
        ))}
      </div>
      {chart === charts[0] &&
        <>
          <h2>{charts[0]} Chart</h2>
          <Line options={line_options} data={data} />
        </>
      }
      {chart === charts[1] &&
        <>
          <h2>{charts[1]} Chart</h2>
          <Bar options={bar_options} data={data} />
        </>
      }
      {chart === charts[2] &&
        <>
          <h2>{charts[2]} Chart</h2>
          <Pie data={pie_data} />
        </>
      }
    </>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);