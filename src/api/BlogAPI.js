import $ from 'jquery';

export const getPostsList = (page, callback) => {
  $.get(`http://localhost:5000/api/postslist/${page}`, result => {
    callback(result);
    console.log(result);
  });
}

export const getPost = (post_id, callback) => {
  $.get(`http://localhost:5000/api/posts/${post_id}`, post => {
    callback(post);
    console.log(post);
  });
}