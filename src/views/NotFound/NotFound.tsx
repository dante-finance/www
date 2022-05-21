import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

export function NotFound(): JSX.Element {
  return (
    <article className={styles['not-found']}>
      <h1>URL Not Found.</h1>
      <Link to="/">Go back home.</Link>
    </article>
  );
}
