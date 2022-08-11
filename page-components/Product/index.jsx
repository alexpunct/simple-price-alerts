import { Spacer, Wrapper } from '@/components/Layout';
import { Post as PostItem } from '@/components/Post';
import PriceAlertForm from './PriceAlertForm';
import Link from 'next/link';
import styles from './UserPost.module.css';

export const Product = ({ post }) => {
  return (
    <Wrapper>
      <Spacer size={2} axis="vertical" />
      <div className={styles.back}>
        <Link href="/products" passHref>
          {'< back'}
        </Link>
      </div>
      <PostItem post={post} />
      <PriceAlertForm post={post} />
      <Spacer size={2} axis="vertical" />
    </Wrapper>
  );
};
