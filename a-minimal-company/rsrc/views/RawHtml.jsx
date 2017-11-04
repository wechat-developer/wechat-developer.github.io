import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './RawHtml.scss';


export default function RawHtml(props) {
  const { content } = props;
  return <div className={styles._} dangerouslySetInnerHTML={{ __html: content }} />;
}


RawHtml.propTypes = {
  content: PropTypes.string.isRequired,
};
