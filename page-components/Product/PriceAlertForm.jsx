import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Container } from '@/components/Layout';
import { fetcher } from '@/lib/fetch';
import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './PriceAlertForm.module.css';

const EmailFormInner = ({ post }) => {
  const emailRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher(`/api/posts/${post._id}/alerts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailRef.current.value }),
        });
        toast.success('You have created an alert');
        emailRef.current.value = '';
        // refresh post lists
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [post._id]
  );

  return (
    <form onSubmit={onSubmit}>
      <Container className={styles.poster}>
        <Input
          ref={emailRef}
          className={styles.input}
          placeholder="Add your email"
          ariaLabel="Add your email"
        />
        <Button type="success" loading={isLoading}>
          Create Alert
        </Button>
      </Container>
    </form>
  );
};

const PriceAlertForm = ({ post }) => {
  return (
    <div className={styles.root}>
      <h3 className={styles.heading}>Create price alert</h3>
      <p className={styles.subtitle}>
        You will be alerted if the price declines by $1 or more.
      </p>
      <EmailFormInner post={post} />
    </div>
  );
};

export default PriceAlertForm;
