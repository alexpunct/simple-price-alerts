import { Spacer, Wrapper } from '@/components/Layout';
import { Button } from '@/components/Button';
import { Container } from '@/components/Layout';
import { fetcher } from '@/lib/fetch';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import styles from './ProductEdit.module.css';

const EditorInner = ({ post }) => {
  const nameRef = useRef(post.name);
  const priceRef = useRef(post.price);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher('/api/posts', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            _id: post._id,
            name: nameRef.current.value,
            price: priceRef.current.value,
          }),
        });
        toast.success('You have updated the product successfully');
        // refresh post lists
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [post]
  );

  const newLocal = 'hidden';
  return (
    <form onSubmit={onSubmit}>
      <div className={styles.back} style={{ marginBottom: 10 }}>
        <Link href="/products" passHref>
          {'< back'}
        </Link>
      </div>
      <Container className={styles.poster}>
        <input defaultValue={post._id} type={newLocal} />
        <input
          defaultValue={post.name}
          ref={nameRef}
          className={styles.input}
        />
        <input
          defaultValue={post.price}
          ref={priceRef}
          className={styles.input}
        />
        <Button type="success" loading={isLoading}>
          Update
        </Button>
      </Container>
    </form>
  );
};

export const ProductEdit = ({ post }) => {
  return (
    <Wrapper>
      <div className={styles.root}>
        <h3 className={styles.heading}>Edit product</h3>
        <EditorInner post={post} />
        <Spacer size={2} axis="vertical" />
      </div>
    </Wrapper>
  );
};
