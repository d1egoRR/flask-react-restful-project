import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row, Well, Jumbotron} from 'react-bootstrap';
import {getDateTime} from '../utils/getDateTime';

function PostComments(props) {
  let commentDateTime = '';
  const totalComments = props.comments.length;
  const commentList = props.comments.map(function(comment, index) {
    getDateTime(comment.date, result => {
      commentDateTime = result;
    });

    return(
      <div key={index} className='text-justify'>
      <Jumbotron>
        <span className='text-danger post-author'>
          {comment.author} - {commentDateTime}
        </span>
        <h4>{comment.text_comment}</h4>
        </Jumbotron>
      </div>
    );
  });

  return(
    <Well>
      <h3>{totalComments} Comentarios</h3>
      <br/>
      {commentList}
    </Well>
  );
}

PostComments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default PostComments;