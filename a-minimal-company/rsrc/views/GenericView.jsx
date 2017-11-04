import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RawHtml from 'bundle-loader?lazy&name=html-view!./RawHtml';
import Price from 'bundle-loader?lazy&name=price-view!./Price';
import Ad from 'bundle-loader?lazy&name=ad-view!./Ad';


const LAZY_COMPONENTS = {
  vHtml: RawHtml,
  vPrice: Price,
  vAd: Ad,
};


export default class GenericView extends Component {
  static propTypes = {
    vType: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      component: null,
    };
  }

  componentDidMount() {
    this.load(this.props.vType);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.vType !== this.props.vType) {
      this.load(nextProps.vType);
    }
  }

  load(vType) {
    const lazy = LAZY_COMPONENTS[vType];
    if (lazy) {
      lazy((loaded) => {
        const component = loaded.default;
        this.setState({ component });
      });
    }
  }

  render() {
    const { component } = this.state;
    if (component) {
      return React.createElement(component, this.props);
    } else {
      return null;
    }
  }
}
