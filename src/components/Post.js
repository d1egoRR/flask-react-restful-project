import React from 'react';
import PropTypes from 'prop-types';
import {Well} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Parser} from 'html-to-react';
import {getDateTime} from '../utils/getDateTime';

const MAX_LENGTH_TEXT = 850

function Post(props) {
  let postDateTime = "";
  getDateTime(props.post.date, result => {
    postDateTime = result;
  });

  const htmlToReactParser = new Parser();
  let textPost = (props.post.text_post.length > MAX_LENGTH_TEXT)
                 ? (props.post.text_post.substring(0, MAX_LENGTH_TEXT))
                 : (props.post.text_post);

  textPost = htmlToReactParser.parse(textPost);

  return(
    <Well>
      <h2>{props.post.title}</h2>
      <div className='text-primary text-right post-author'>
        {postDateTime}
      </div>
      <div className='lead text-justify'>
        <p>{textPost}...</p>
        <Link to={'/post/' + props.post._id}>
          Leer más...
        </Link>
      </div>
    </Well>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default Post;