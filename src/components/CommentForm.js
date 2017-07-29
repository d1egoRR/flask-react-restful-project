import React from 'react';
import {findDOMNode} from 'react-dom';
import {
  Col, Row, Button, Well,
  ControlLabel, FormGroup, FormControl
} from 'react-bootstrap';

export default class CommentForm extends React.Component {
  onSubmit() {
    const comment = {
      comment_author: findDOMNode(this.refs.author).value.trim(),
      comment_text: findDOMNode(this.refs.comment_text).value.trim()
    }

    this.props.handleAddComment(comment);
  }

  render() {
    return(
      <Well>
        <Row>
          <Col>
            <FormGroup className='col-xs-4'>
              <FormControl type='text' placeholder='nombre' ref='author' />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup className='col-xs-8'>
              <FormControl
                rows={10}
                componentClass='textarea'
                placeholder='comentario'
                ref='comment_text'
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup className='col-xs-8'>
              <Button
                bsStyle='primary'
                onClick={::this.onSubmit}>
                  Enviar Comentario
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Well>
    );
  }
}