
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('posts')
        .insert({
          users_id: 1,
          title: 'A wise man once told me...',
          post: 'I think people get worse until they start getting better. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at consectetur nisl, vel viverra leo. Nunc eu erat ultrices, pretium nulla ac, lobortis sapien. Suspendisse potenti. Nullam quis varius mauris. Pellentesque non laoreet justo. Nam iaculis lorem ex, volutpat suscipit dui pretium vitae. Vivamus sodales dui ut ipsum venenatis, eu viverra eros fermentum. In sapien mi, dapibus vel lectus eu, venenatis vehicula nisi. Donec sapien orci, faucibus at feugiat sit amet, finibus vitae tortor. Ut sit amet orci elit. Duis nisl nibh, volutpat dignissim iaculis non, fringilla at est.'
        }),
        knex('posts')
        .insert({
          users_id:  3,
          title: 'Everything will be alright in the end.',
          post: 'If it is not alright, then it is not the end. Fusce non arcu sapien. Vivamus eleifend nisl at tempor feugiat. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ornare diam consectetur metus viverra vestibulum. Integer venenatis vel eros sed venenatis. Sed ornare elementum blandit. Duis posuere eros id faucibus congue. Praesent non dictum nisl, vel maximus eros. Fusce condimentum dictum sodales. Nam ullamcorper ultrices dignissim. Nunc congue porttitor lorem id bibendum. Etiam suscipit, eros ac cursus consequat, erat tellus luctus quam, quis volutpat lectus nulla quis dolor. Nulla ornare vitae nulla non mollis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque ullamcorper felis nisi. Vestibulum vitae nulla sit amet ante fringilla auctor id vitae lectus.'
        }),
        knex('posts')
        .insert({
          users_id: 2,
          title: 'In my world everything is exactly as it should be',
          post: 'And that is why I am not upset by suffering in this world. Nam malesuada porttitor felis, at lacinia lacus tempus et. Nunc aliquam dui lorem, id molestie risus finibus eget. Ut hendrerit, metus nec suscipit imperdiet, quam nisi accumsan lorem, quis elementum ante risus et dolor. Duis ac fringilla tortor. Suspendisse vel turpis consequat dui lacinia ullamcorper ac ut arcu. Nullam erat turpis, congue ac nulla sit amet, tincidunt facilisis leo. Pellentesque congue blandit ex, nec vehicula magna mollis luctus. Pellentesque vitae est quis urna dignissim posuere at sit amet justo. Duis vitae rutrum quam, a sodales metus. Phasellus vitae accumsan lacus. Mauris porta lacinia risus placerat interdum. Sed vel pellentesque velit. Pellentesque sit amet sem eget urna blandit mattis sit amet vitae mi.'
        })
      ]);
    });
};
