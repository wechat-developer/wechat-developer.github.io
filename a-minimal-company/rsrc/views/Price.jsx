import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './Price.scss';


export default function Price(props) {
  const { content } = props;
  return <div className={styles._}>￥{content}</div>;
}


Price.propTypes = {
  content: PropTypes.string.isRequired,
};
