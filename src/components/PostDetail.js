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
      this.setState({post: post});
    });
  }

  render() {
    return(
      <Grid>
        <Row>
          <Col>
            <Well>
              <h6>{this.state.post.title}</h6>
              <p>{this.state.post.text_post}</p>
              <Link to='/'>Volver</Link>
            </Well>
          </Col>
        </Row>
      </Grid>
    );
  }
}