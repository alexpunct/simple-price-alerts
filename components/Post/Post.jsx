import { format } from '@lukeed/ms';
import clsx from 'clsx';
import { useMemo } from 'react';
import styles from './Post.module.css';

const Post = ({ post, className }) => {
  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(post.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return 'Just now';
    return `${format(diff, true)} ago`;
  }, [post.createdAt]);
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.wrap}>
        <span className={styles.name}>{post.name}</span> {'  '}
        <span className={styles.content}>(Price: ${post.price})</span>
        <a></a>
      </div>
      <div className={styles.wrap}>
        <time dateTime={String(post.createdAt)} className={styles.timestamp}>
          <i>
            created by {post.creator.username} {timestampTxt}
          </i>
        </time>
      </div>
    </div>
  );
};

export default Post;
