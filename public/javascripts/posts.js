'use strict'

$(document).ready(() => {
    console.log('im listening');

    $('#postForm').submit((event) => {
      event.preventDefault();

      const title = $('#title').val();
      const post = $('#post').val();

      if (!title) {
        return Materialize.toast('Title must not be blank', 3000);
      }

      if (!post) {
        return Materialize.toast('Post must not be blank', 3000);
      }

      $("#postForm").unbind()

  })
})
