// @ts-nocheck

import dynamic from 'next/dynamic';
import * as R from 'ramda';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ApexChart = (Props) => {
  const { data } = Props;
  const inputData = R.pathOr([], [], data);

  const yData = inputData.map((item) => item.y);
  const xData = inputData.map((item) => item.x);
  const newData = {
    series: [
      {
        name: 'Desktops',
        data: yData,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: xData,
      },
    },
  };
  return <Chart options={newData.options} series={newData.series} type="line" width="800" />;
};

export default ApexChart;
