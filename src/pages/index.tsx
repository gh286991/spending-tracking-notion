import Link from 'next/link';
import { Client } from '@notionhq/client';
import notionConfig from '../lib/notionConfig';
import Head from 'next/head';
import * as R from 'ramda';
import moment from 'moment';
import { RadialChart } from 'react-vis';
import { Chart, Line, Point, Tooltip, Legend } from 'bizcharts';

export default function Home(props: any) {
  const { data } = props;

  const dataToFormat = data.map((item: any) => {
    const name = R.pathOr('', ['properties', 'Name', 'title', 0, 'text', 'content'], item);
    const tagsArray = R.pathOr([], ['properties', 'Tags', 'multi_select'], item);
    const tags = tagsArray.map((tag: any) => {
      return tag.name;
    });
    const amount = R.pathOr([], ['properties', '金額', 'formula', 'number'], item);
    const date = moment(R.pathOr('', ['properties', '日期', 'date', 'start'], item)).format(
      'MM/DD',
    );

    return {
      name,
      tags,
      amount,
      date,
    };
  });

  const calXYData = () => {
    let data = dataToFormat,
      hash = Object.create(null),
      result;

    for (let { date, amount } of data) {
      if (hash[date]) hash[date] += amount;
      else hash[date] = amount;
    }

    result = Object.entries(hash).map(([date, amount]) => ({ x: date, y: amount }));

    const newResult = result.sort(function (a: any, b: any) {
      const newA = new Date(a.x) as any;
      const newB = new Date(b.x) as any;
      return newA - newB;
    });

    return newResult.filter((item) => item.x !== 'Invalid date');
  };

  const myData = [
    { angle: 1 },
    { angle: 2, label: 'Super Custom label', subLabel: 'With annotation' },
    { angle: 5, label: 'Alt Label' },
    { angle: 3 },
    { angle: 5, subLabel: 'Sub Label only', className: 'custom-class' },
  ];

  const scale = {
    y: { min: 0, max: 1500 },
  };

  console.log(calXYData());
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/react-vis@1.11.7/dist/style.css" />
      </Head>
      <div>
        Hello World.
        <Link href="/about">
          <a>About</a>
        </Link>
        <RadialChart data={myData} width={300} height={300} labelsAboveChildren={true} showLabels />
        <Chart
          scale={scale}
          padding={[30, 20, 60, 40]}
          autoFit
          height={320}
          data={calXYData()}
          interactions={['element-active']}
        >
          <Point position="x*y" shape="circle" />
          <Line shape="smooth" position="x*y" label="y" />
          <Tooltip shared showCrosshairs />
          <Legend
            background={{
              padding: [5, 100, 5, 36],
              style: {
                fill: '#eaeaea',
                stroke: '#fff',
              },
            }}
          />
        </Chart>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const notion = new Client({ auth: notionConfig.BEARER_TOKEN });
  const response = await notion.databases.query({
    database_id: notionConfig.DATABASE_ID,
  });

  console.log('response', response);
  return {
    props: {
      data: response.results,
    },
  };
}
