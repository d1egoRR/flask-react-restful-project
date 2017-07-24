import React from 'react';
import Post from './Post';
import {Col, Row, Grid} from 'react-bootstrap';

export default class PostsList extends React.Component {
  render() {
    const postsList = this.props.posts.map(function(post) {
      return(
        <Row key={post._id}>
          <Col>
            <Post
              title={post.title}
              text_post={post.text_post} />
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