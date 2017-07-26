import React from 'react';
import {Col, Row, Grid} from 'react-bootstrap';

import Post from './Post';

export default class PostsList extends React.Component {
  render() {
    const postsList = this.props.posts.map(function(post) {
      return(
        <Row key={post._id}>
          <Col>
            <Post post={post} />
          </Col>
        </Row>
      )
    });

    return(
      <Grid>
        {postsList}
      </Grid>
    );
  }
}