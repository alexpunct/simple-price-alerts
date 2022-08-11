import { ButtonLink } from '@/components/Button';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <Wrapper>
      <div>
        <h1 className={styles.title}>
          <span className={styles.nextjs}>eCommerce</span>
          <span className={styles.mongodb}>Price Alerts</span>
          <span>Demo App</span>
        </h1>
        <Container justifyContent="center" className={styles.buttons}>
          <Container>
            <Link passHref href="/products">
              <ButtonLink className={styles.button}>View Products</ButtonLink>
            </Link>
          </Container>
          <Spacer axis="horizontal" size={1} />
        </Container>
        <p className={styles.subtitle}>
          Simple proof of concept for setting and receiving price alerts.
        </p>
      </div>
    </Wrapper>
  );
};

export default Hero;
