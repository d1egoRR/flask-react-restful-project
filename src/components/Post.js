import React from 'react';
import {Well} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default class Post extends React.Component {
  render() {
    const text_post = (this.props.text_post.length > 300)
                    ? (this.props.text_post.substring(0, 300))
                    : (this.props.text_post);
    return(
      <Well>
        <h6>{this.props.title}</h6>
        <p>{text_post}</p>
        <Link to='/post/1'>Leer más...</Link>
      </Well>
    );
  }
}