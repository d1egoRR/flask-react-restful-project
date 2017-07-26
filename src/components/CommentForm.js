import React from 'react';
import {
  Col, Row, Button, Well,
  ControlLabel, FormGroup, FormControl
} from 'react-bootstrap';

function CommentForm() {
  return(
    <Well>
      <form>
        <Row>
          <Col>
            <FormGroup className='col-xs-4'>
              <FormControl type='text' placeholder='nombre' />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup className='col-xs-8'>
              <FormControl rows={10} componentClass='textarea' placeholder='comentario' />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup className='col-xs-8'>
              <Button bsStyle='primary'>Enviar Comentario</Button>
            </FormGroup>
          </Col>
        </Row>
      </form>
    </Well>
  );
}

export default CommentForm;