import React from 'react';
import {Well} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Parser} from 'html-to-react';

const MAX_LENGTH_TEXT = 850

export default class Post extends React.Component {

  getDateTime(postDateTime) {
    const result = postDateTime
                    .split(' ')[0]
                    .split('-')
                    .reverse()
                    .join('/');
    return result;
  }

  render() {
    const htmlToReactParser = new Parser();
    const postDateTime = this.getDateTime(this.props.post.date);
    let textPost = (this.props.post.text_post.length > MAX_LENGTH_TEXT)
                   ? (this.props.post.text_post.substring(0, MAX_LENGTH_TEXT))
                   : (this.props.post.text_post);

    textPost = htmlToReactParser.parse(textPost);

    return(
      <Well>
        <h2>{this.props.post.title}</h2>
        <div className='text-primary text-right post-author'>
          {this.props.post.author} - {postDateTime}
        </div>
        <div className='lead text-justify'>
          <p>{textPost}...</p>
          <Link to={'/post/' + this.props.post._id}>
            Leer más...
          </Link>
        </div>
      </Well>
    );
  }
}