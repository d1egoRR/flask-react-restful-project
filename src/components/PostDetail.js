import React from 'react';
import {Grid, Col, Row, Well} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Parser} from 'html-to-react';
import {getPost} from '../api/BlogAPI';
import {getDateTime} from '../utils/getDateTime';
import CommentForm from './CommentForm';
import Comment from './Comment';
import {addComment} from '../api/BlogAPI';

export default class PostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "id" : this.props.match.params.id,
      "post": [],
      "comments": []
    }
  }

  componentDidMount() {
    getPost(this.state.id, post => {
      this.setState({
        post: post,
        comments: post.comments
      });
    });
  }

  addNewComment(comment) {
    // DEVOLVER EN EL RESULT DE ADD COMMENT EL NUEVO COMMENT
    // CUANDO SE GRABA SIEMPRE DEVOLVER LO QUE SE GRABA APARTE DEL RESULT TRUE
    // ARREGLAR TEST
    // CAMBIAR PUT X POST
    addComment(this.state.id, comment, addOk => {
      if (addOk.result) {
        const currentComments = this.state.comments;
        const newComment = {
          author: comment.author,
          date: comment.date,
          text_comment: comment.text_comment
        }

        currentComments.push(newComment);
        this.setState({comments: currentComments});
      }
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

    console.log(this.state.comments);

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
            <Comment comments={this.state.comments} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CommentForm handleAddComment={::this.addNewComment} />
          </Col>
        </Row>
      </Grid>
    );
  }
}