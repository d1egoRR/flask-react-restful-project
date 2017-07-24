import React from 'react';
import {getPosts} from '../api/BlogAPI';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    getPosts(1, posts => {
      this.setState({posts: posts});
    });
  }

  render() {
    return(
      <div>HOME</div>
    );
  }
}