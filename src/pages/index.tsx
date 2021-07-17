import Link from 'next/link';
import useSWR from 'swr';
import notion from '../lib/notionConfig';
import getTestFetcher from './GetNotionDatabase';
import { Client } from '@notionhq/client';
import notionConfig from '../lib/notionConfig';

export default function Home(props: any) {
  const { books } = props;
  const envURL = process.env.BACKEND_URL;

  console.log('book', books);
  const url = `https://api.notion.com/v1/databases/${notion.DATABASE_ID}`;
  const { data } = useSWR(url, getTestFetcher);
  console.log('data', data);
  return (
    <div>
      Hello World.
      <Link href="/about" as={envURL + '/about'}>
        <a>About</a>
      </Link>
    </div>
  );
}

export async function getStaticProps() {
  const notion = new Client({ auth: notionConfig.BEARER_TOKEN });
  const response = await notion.databases.query({
    database_id: notionConfig.DATABASE_ID,
  });

  return {
    props: {
      books: response.results,
    },
  };
}
