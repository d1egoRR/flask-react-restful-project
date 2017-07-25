import React from 'react';
import {Grid, Col, Row, Well} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getPost} from '../api/BlogAPI';

export default class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'id' : this.props.match.params.id,
      'post': {}
    }
  }

  componentDidMount() {
    getPost(this.state.id, post => {
      this.setState({post: post});    });
  }

  render() {
    const currentPost = this.state.post;
    let commentList = '';

    if (currentPost['comments']) {
      commentList = currentPost.comments.map(function(comment, index) {
        return(
          <Row key={index}>
            {comment.text_comment} -- 
            {comment.author}
          </Row>
        );
      });
    }

    return(
      <Grid>
        <Row>
          <Col>
            <Well>
              <h1>{this.state.post.title}</h1>
              <p>{this.state.post.text_post}</p>
              <Link to='/'>Volver</Link>
            </Well>
          </Col>
        </Row>
        <Row>
          <Col>
            <Well>
              <h3>Comentarios</h3>
              <hr></hr>
              {commentList}
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  }
}