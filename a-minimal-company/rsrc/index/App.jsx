import pathToRegexp from 'path-to-regexp';
import React, { Component } from 'react';
import $http from 'vanilla.js/axios/http';
import next from '../service/gateway';
import GenericView from '../views/GenericView';


const REG = pathToRegexp('/timeflies/:threadId');


export default class Router extends Component {
  constructor(props) {
    super(props);

    const matches = REG.exec(window.location.hash.substring(1));

    this.state = {
      title: null,
      html: null,
      prevPage: 0,
      threadId: matches[1],
      threadPosition: 0,
      nextPage: 0,
      views: [],
      nextPageId: null,
      loading: true,
      result: [],
      graph: {},
    };

    this.field = this.field.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { threadId } = this.state;
    next(threadId, null).then(page => this.pick(page));
  }

  pick(page) {
    const { pageId, title, subTitle, views } = page;
    this.setState({ pageId, title, subTitle, views, loading: false });
  }

  field(questionId, answer) {
    const { views } = this.state;
    const idx = views.findIndex(v => v.questionId === questionId);
    if (idx >= 0) {
      const form = views[idx];
      form.answer = answer;
      views.splice(idx, 1, form);
      this.setState({ views });
    }
  }

  submit() {
    const { threadId, pageId, command } = this.state;
    next(threadId, pageId, command).then(page => this.pick(page));
  }

  render() {
    const { loading, views } = this.state;

    if (loading) {
      return <h1>LOADING...</h1>;
    } else {
      return (
        <div className="Card">
          <h1 className="text-center">{this.state.title}</h1>
          <h2 className="text-center"><em>{this.state.subTitle}</em></h2>

          <form className="form-horizontal">
            {views.map(v => <GenericView {...v} field={this.field} key={v.viewId} />)}

            <div className="form-group">
              <button type="button" className="Next" onClick={this.submit} />
            </div>
          </form>
        </div>
      );
    }
  }
}
