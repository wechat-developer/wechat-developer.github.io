import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as styles from './Ad.scss';


export default class Ad extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      modal: false,
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    this.setState({ modal: true });
  }

  hide() {
    this.setState({ modal: false });
  }

  render() {
    const { content } = this.props;
    const { modal } = this.state;
    return (
      <div className={styles._}>
        <button type="button" onClick={this.show}>详情扫码进群咨询</button>
        {modal &&
        <div className={styles.modal}>
          <img src={content} alt="知识星球-微信开发者" title="知识星球-微信开发者" onClick={this.hide} />
        </div>}
      </div>
    );
  }
}
