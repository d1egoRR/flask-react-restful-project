import React from 'react';
import {Grid, Col, Row, Well} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Parser} from 'html-to-react';
import {getPost} from '../api/BlogAPI';
import {getDateTime} from '../utils/getDateTime';
import CommentForm from './CommentForm';
import Comment from './Comment';

export default class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "id" : this.props.match.params.id,
      "post": []
    }
  }

  componentDidMount() {
    getPost(this.state.id, post => {
      this.setState({post: post});
    });
  }

  render() {
    const htmlToReactParser = new Parser();
    const textPost = htmlToReactParser.parse(this.state.post.text_post);

    let postDateTime = "";
    if (this.state.post.date) {
      getDateTime(this.state.post.date, result => {
        postDateTime = result;
      });
    }

    const commentList = (this.state.post["comments"])
                      ? this.state.post.comments
                      : [];

    return(
      <Grid>
        <Row>
          <Col>
            <Well>
              <h2>{this.state.post.title}</h2>
              <div className='text-primary text-right post-author'>
                {postDateTime}
              </div>
              <div className='lead text-justify'>
                <p>{textPost}</p>
                <br/>
                <Link to='/'>Volver</Link>
              </div>
            </Well>
          </Col>
        </Row>
        <Row>
          <Col>
            <Comment comments={commentList} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CommentForm />
          </Col>
        </Row>
      </Grid>
    );
  }
}