import React from 'react';
import {Grid, Col, Row, Jumbotron} from 'react-bootstrap';

export default class About extends React.Component {
  render() {
    return(
      <Grid>
        <Jumbotron>
          <Row style={{marginTop:'15px'}}>
            acerca de...
          </Row>
        </Jumbotron>
      </Grid>
    );
  }
}