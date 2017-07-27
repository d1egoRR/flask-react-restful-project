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
      currentPage: parseInt(page),
      posts: [],
      postsCount: 0
    }
  }

  componentDidMount() {
    this.getPostsListData(this.state.currentPage);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPage: parseInt(nextProps.match.params.page)
    });
    this.getPostsListData(nextProps.match.params.page);
  }

  getPostsListData(page) {
    getPostsList(page, result => {
      this.setState({
        posts: result.posts,
        postsCount: parseInt(result.posts_count)
      });
    });
  }

  render() {
    window.scrollTo(0, 0);
    const totalPages = Math.ceil(this.state.postsCount / LIMIT_POSTS_PER_PAGE);
    const previousPage = (this.state.currentPage > 1)
                       ? (this.state.currentPage - 1)
                       : false;
    const nextPage = (totalPages > this.state.currentPage)
                   ? (this.state.currentPage + 1)
                   : false;
    return(
      <div>
        <PostsList posts={this.state.posts} />
        <Grid>
          {(previousPage)
            ? <div key={previousPage}>
                <Link to={`/posts/${previousPage}`} >
                  &larr; Página Anterior
                </Link>
              </div>
            : ''}

          {(nextPage)
            ? <div key={nextPage}>
                <Link to={`/posts/${nextPage}`} >
                  Página Siguiente &rarr;
                </Link>
              </div>
            : ''}
        </Grid>
      </div>
    );
  }
}