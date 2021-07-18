import Link from 'next/link';
import { Client } from '@notionhq/client';
import notionConfig from '../lib/notionConfig';
import * as R from 'ramda';
import { RadialChart } from 'react-vis';

export default function Home(props: any) {
  const { books, data } = props;

  console.log('book', books);
  console.log('data', data);
  const myData = [
    { angle: 1 },
    { angle: 2, label: 'Super Custom label', subLabel: 'With annotation' },
    { angle: 5, label: 'Alt Label' },
    { angle: 3 },
    { angle: 5, subLabel: 'Sub Label only', className: 'custom-class' },
  ];
  return (
    <div>
      Hello World.
      <Link href="/about">
        <a>About</a>
      </Link>
      <RadialChart data={myData} width={300} height={300} labelsAboveChildren={true} showLabels />
      {String(data)}
    </div>
  );
}

export async function getStaticProps() {
  const notion = new Client({ auth: notionConfig.BEARER_TOKEN });
  const response = await notion.databases.query({
    database_id: notionConfig.DATABASE_ID,
  });

  const result = response.results;

  const data = result.map((item) => {
    const name = R.pathOr('', ['properties', 'Name', 'title', 0, 'text', 'content'], item);
    return name;
  });

  console.log('data', data);
  return {
    props: {
      books: response.results,
      data,
    },
  };
}
