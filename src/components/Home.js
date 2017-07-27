import React from 'react';
import {Grid} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PostsList from './PostsList';
import {getPostsList} from '../api/BlogAPI';

const LIMIT_POSTS_PER_PAGE = 5;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    const page = (this.props.match.params.page)
               ? (this.props.match.params.page)
               : 1;
    this.state = {
      page: page,
      posts: []
    }
  }

  componentDidMount() {
    getPostsList(this.state.page, result => {
      //const next_page = result.posts_count / LIMIT_POSTS_PER_PAGE;
      this.setState({
          posts: result.posts,
          posts_count: result.posts_count
        });
    });
  }

  render() {
    return(
      <div>
        <PostsList posts={this.state.posts} />
        <Grid>
          <Link to={'/posts/2'}>
            Página Siguiente &rarr;
          </Link>
        </Grid>
      </div>
    );
  }
}