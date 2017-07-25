import React from 'react';
import PostsList from './PostsList';
import {getPostsList} from '../api/BlogAPI';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    getPostsList(1, posts => {
      this.setState({posts: posts});
    });
  }

  render() {
    return(
      <div>
        <PostsList posts={this.state.posts} />
      </div>
    );
  }
}