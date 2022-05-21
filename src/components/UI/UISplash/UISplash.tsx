import React from 'react';

import styles from './UISplash.module.scss';

interface UISplashProps {
  children: React.ReactNode;
}

export function UISplash(props: UISplashProps): JSX.Element {
  const { children } = props;

  return <article className={styles.splash}>{children}</article>;
}
