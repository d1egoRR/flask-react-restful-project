import React from 'react';
import {Col, Grid, Well, Row} from 'react-bootstrap';
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
      currentPage: parseInt(nextProps.match.params.page),
      posts: [],
      postsCount: 0
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
          <Well bsSize="small">
            <Row>
              <Col className='col-xs-6'>
                <div className='text-center'>
                  {(previousPage)
                    ? <div className='previous-next-page' key={previousPage}>
                        <Link to={`/posts/page/${previousPage}`} >
                          &larr; Página Anterior
                        </Link>
                      </div>
                    : ''}
                </div>
              </Col>
              <Col className='col-xs-6'>
                <div className='text-center'>
                  {(nextPage)
                    ? <div className='previous-next-page' key={nextPage}>
                        <Link to={`/posts/page/${nextPage}`} >
                          Página Siguiente &rarr;
                        </Link>
                      </div>
                    : ''}
                </div>
              </Col>
            </Row>
          </Well>
        </Grid>
      </div>
    );
  }
}