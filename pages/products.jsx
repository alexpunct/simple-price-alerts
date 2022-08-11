import { Feed } from '@/page-components/Feed';
import Head from 'next/head';

const FeedPage = () => {
  return (
    <>
      <Head>
        <title>Products feed</title>
      </Head>
      <Feed />
    </>
  );
};

export default FeedPage;
