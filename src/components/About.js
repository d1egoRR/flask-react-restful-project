import React from 'react';
import {Grid, Col, Row, Jumbotron} from 'react-bootstrap';

function About() {
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

export default About;