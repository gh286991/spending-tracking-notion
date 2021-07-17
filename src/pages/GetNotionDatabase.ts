import notion from '../lib/notionConfig';

const getRequestInitPrefix = () => ({
  method: 'GET',
  headers: {
    Authorization: `Bearer ${notion.BEARER_TOKEN}`,
    'Notion-Version': '2021-05-13',
    redirect: 'follow',
    'Content-Type': 'application/json',
  },
});

const getTestFetcher = async (url: string) => {
  let response = await fetch(url, {
    ...getRequestInitPrefix(),
  }).then((result) => result.json());
  response = new Response(response.body, response);
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
};

// const getTestFetcher = (url: string) =>
//   fetch(url, { ...getRequestInitPrefix() }).then((result) => result.json());

export default getTestFetcher;
