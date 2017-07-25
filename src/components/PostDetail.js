import React from 'react';
import {Well} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class PostDetail extends React.Component {
  render() {
    return(
      <Well>
        <h6>props.title</h6>
        <p>text_post</p>
        <Link to='/'>Volver</Link>
      </Well>
    );
  }
}