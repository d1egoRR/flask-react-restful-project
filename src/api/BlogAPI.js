import $ from 'jquery';

export const getPosts = (page, callback) => {
  $.get(`http://localhost:5000/api/postslist/${page}`, posts => {
    callback(posts);
    console.log(posts);
  });
}