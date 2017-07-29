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

export const addComment = (post_id, comment, callback) => {
  console.log("addcomment");
  console.log(comment);
  $.post(`http://localhost:5000/api/comments/add/${post_id}`, comment, result => {
    callback(result);
  });
}

/*export const addComment = (post_id, comment, callback) => {
  console.log("addcomment");
  axios.put(`http://localhost:5000/api/comments/add/${post_id}`, comment, {
    headers: {
      'Accept': 'application/json'
    }
  });
}*/