import React from 'react';
import styles from './Layout.module.css';

const layout = props => {
  return (
    <>
      <div>toolbar, sidebar</div>
      <div className={styles.main}>{props.children}</div>
    </>
  );
};

export default layout;
