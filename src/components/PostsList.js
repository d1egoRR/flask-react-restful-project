import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row, Grid} from 'react-bootstrap';
import Post from './Post';

function PostsList(props) {
  const postsList = props.posts.map(post =>
    <Row key={post._id}>
      <Col>
        <Post post={post} />
      </Col>
    </Row>
  );

  return <Grid>{postsList}</Grid>;
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostsList;