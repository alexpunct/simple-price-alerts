import { findPostById } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import { Product } from '@/page-components/Product';
import { ProductEdit } from '@/page-components/ProductEdit';
import { useCurrentUser } from '@/lib/user';
import Head from 'next/head';

export default function UserPostPage({ post }) {
  const { data } = useCurrentUser();
  if (typeof post.createdAt !== 'string') {
    post.createdAt = new Date(post.createdAt);
  }
  return (
    <>
      <Head>
        <title>
          {post.creator.name} ({post.creator.username}): {post.content}
        </title>
      </Head>
      {data?.user ? (
        <ProductEdit post={post} user={data?.user} />
      ) : (
        <Product post={post} />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();

  const post = await findPostById(db, context.params.postId);
  if (!post) {
    return {
      notFound: true,
    };
  }

  post._id = String(post._id);
  post.creatorId = String(post.creatorId);
  post.creator._id = String(post.creator._id);
  post.createdAt = post.createdAt.toJSON();
  return { props: { post } };
}
