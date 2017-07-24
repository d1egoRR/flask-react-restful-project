import React from 'react';
import {Well} from 'react-bootstrap';

export default class Post extends React.Component {
  render() {
    const text_post = (this.props.text_post.length > 300)
                    ? (this.props.text_post.substring(0, 300))
                    : (this.props.text_post);
    return(
      <Well>
        <h6>{this.props.title}</h6>
        <p>{text_post}</p>
        Leer más...
      </Well>
    );
  }
}