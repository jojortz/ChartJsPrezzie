import React from 'react';
const { useState, useRef, useEffect } = React;
import { createRoot } from 'react-dom/client';
import { Slider, Switch } from '@mui/material';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
 Filler
);

const DataContainer = styled.div`
  height: 100px;
  box-sizing: border-box;
  margin: 50px 0;
`;
const DataSliderContainer = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChartContainer = styled.div`
  border: 1pt solid #ddd;
  border-radius: 15px;
  padding: 15px;
  display: flex;
  justify-content: center;
  height: 40vh;
  width: 100%;
`;
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
  maintainAspectRatio: false, //needed to set chart dimensions to match ChartContainer dimensions
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
  maintainAspectRatio: false,
};

const pie_options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Pie Chart',
    },
  },
  maintainAspectRatio: false,
};

const doughnut_options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Doughnut Chart',
    },
  },
  maintainAspectRatio: false,
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const charts = {
  Line: 'Line',
  Bar: 'Bar',
  Pie: 'Pie',
  Doughnut: 'Doughnut'
};

const App = () => {

  let data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Dataset 1',
        data: [1, 23, 13, 25, 27, 15, 30],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        //fill: true,
        label: 'Dataset 2',
        data: [5, 13, 3, 21, 21, 31, 20],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const pie_data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Pink', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3, 7],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255,192,203, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255,192,203, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const [lineData, setData1] = useState(data);
  const [pieData, setPieData] = useState(pie_data);
  const [chart, setChart] = useState(charts.Line);
  const [dataMode, setDataMode] = useState(false);

  const handleDataChange = (e, dataset, index) => {
    e.preventDefault();
    let dataTemp = JSON.parse(JSON.stringify(lineData));
    dataTemp.datasets[dataset].data[index] = e.target.value;
    setData1(dataTemp);
  };

  const handlePieChange = (e, index) => {
    e.preventDefault();
    let pieDataTemp = JSON.parse(JSON.stringify(pieData));
    pieDataTemp.datasets[0].data[index] = e.target.value;
    setPieData(pieDataTemp);
  };

  const handleToggle = (e) => {
    setDataMode(!dataMode);
  };

  return (
    <>
      <h1>Chart JS Prezzie</h1>
      <div className='tab-bar'>
        {Object.keys(charts).map((chartName, i) => (
          <div
            key={chartName + i}
            className='tab'
            onClick={e => {
              e.preventDefault();
              setChart(chartName);
            }}
            style={{
              borderBottom: `${chartName === chart ? '2pt solid rgb(53, 162, 235)' : '1pt solid #ddd'}`,
              fontWeight: `${chartName === chart ? '700' : '400'}`,
            }}
          >{chartName}</div>
        ))}
      </div>
      {chart === charts.Line &&
        <ChartContainer>
          <Line
            options={line_options}
            data={lineData}
          />
        </ChartContainer>
      }
      {chart === charts.Bar &&
          <ChartContainer>
            <Bar options={bar_options} data={lineData} />
          </ChartContainer>
      }
      {chart === charts.Pie &&
          <ChartContainer>
            <Pie data={pieData} options={pie_options} />
          </ChartContainer>
      }
      {chart === charts.Doughnut &&
          <ChartContainer>
            <Doughnut data={pieData} options={doughnut_options} />
          </ChartContainer>
      }
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
       <Switch checked={dataMode} onChange={handleToggle}/><div>Data Control {dataMode ? <>On</> : <>Off</>} </div>
      </div>
      { dataMode &&
      <>
      <DataContainer>
        <h3>Dataset 1</h3>
        {lineData.datasets[0].data !== undefined && (chart === charts.Line || chart === charts.Bar) &&
          <DataSliderContainer>
            [
            {lineData.datasets[0].data.map((point, i) => (
              <Slider
              sx={{
                '& input[type="range"]': {
                  WebkitAppearance: 'slider-vertical',
                },
              }}
              value={lineData.datasets[0].data[i] ?lineData.datasets[0].data[i] : 0}//to get rid of MUI Controlled Slider warnings
              min={0}
              max={50}
              orientation="vertical"
              defaultValue={point}
              aria-label="Temperature"
              valueLabelDisplay="on"
              onChange={e => handleDataChange(e, 0, i)}
              />
              ))}
            ]
          </DataSliderContainer>
        }
        {lineData.datasets[0].data !== undefined && (chart === charts.Pie || chart === charts.Doughnut) &&
          <DataSliderContainer>
            [
            {pieData.datasets[0].data.map((point, i) => (
              <Slider
              sx={{
                '& input[type="range"]': {
                  WebkitAppearance: 'slider-vertical',
                },
              }}
              value={pieData.datasets[0].data[i] ? pieData.datasets[0].data[i] : 0}//to get rid of MUI Controlled Slider warnings
              min={0}
              max={50}
              orientation="vertical"
              defaultValue={point}
              aria-label="Temperature"
              valueLabelDisplay="on"
              onChange={e => handlePieChange(e, i)}
              />
              ))}
            ]
          </DataSliderContainer>
        }
      </DataContainer>
      <DataContainer>
        {lineData.datasets[1].data !== undefined && (chart === charts.Line || chart === charts.Bar) &&
          <>
            <h3>Dataset 2</h3>
            <DataSliderContainer>
              [
              {lineData.datasets[1].data.map((point, i) => (
                <Slider
                sx={{
                  '& input[type="range"]': {
                    WebkitAppearance: 'slider-vertical',
                  },
                }}
                value={lineData.datasets[1].data[i] ?lineData.datasets[1].data[i] : 0}//to get rid of MUI Controlled Slider warnings
                min={0}
                max={50}
                orientation="vertical"
                defaultValue={point}
                aria-label="Temperature"
                valueLabelDisplay="on"
                onChange={e => handleDataChange(e, 1, i)}
                />
                ))}
              ]
            </DataSliderContainer>
          </>
        }
      </DataContainer>
      </>
      }
      <h4>Sources</h4>
      <ul>
        <li><a href="https://react-chartjs-2.js.org/examples/line-chart" target="_blank" rel="noopener noreferrer">Line Chart</a></li>
        <li><a href="https://react-chartjs-2.js.org/examples/vertical-bar-chart" target="_blank" rel="noopener noreferrer">Vertical Bar Chart</a></li>
        <li><a href="https://react-chartjs-2.js.org/examples/pie-chart" target="_blank" rel="noopener noreferrer">Pie Chart</a></li>
        <li><a href="https://react-chartjs-2.js.org/examples/doughnut-chart" target="_blank" rel="noopener noreferrer">Doughnut Chart</a></li>
        <li><a href="https://mui.com/material-ui/react-switch/" target="_blank" rel="noopener noreferrer">Material UI Switch</a></li>
        <li><a href="https://mui.com/material-ui/react-slider/" target="_blank" rel="noopener noreferrer">Material UI Slider</a></li>
      </ul>
    </>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);