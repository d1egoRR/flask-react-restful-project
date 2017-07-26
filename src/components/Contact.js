import React from 'react';
import {
  Grid, Col, Row, Panel, Button,
  ControlLabel, FormGroup, FormControl
} from 'react-bootstrap';

export default class Contact extends React.Component {
  render() {
    const title = 'Contacto';

    return(
      <Grid>
        <Panel header={title}>
          <form>
            <Row>
              <Col>
                <FormGroup className='col-xs-4'>
                  <ControlLabel>Nombre</ControlLabel>
                  <FormControl type="text" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup className='col-xs-4'>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl type="text" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup className='col-xs-8'>
                  <ControlLabel>Mensaje</ControlLabel>
                  <FormControl rows={10} componentClass="textarea" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup className='col-xs-8'>
                  <Button bsStyle="primary">Enviar</Button>
                </FormGroup>
              </Col>
            </Row>
          </form>
        </Panel>
      </Grid>
    );
  }
}