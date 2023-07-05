const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{id}/likes',
    handler: handler.postAlbumLikesHandler,
    options: {
      auth: 'sub2_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/albums/{id}/likes',
    handler: handler.deleteAlbumLikesHandler,
    options: {
      auth: 'sub2_jwt',
    },
  },
  {
    method: 'GET',
    path: '/albums/{id}/likes',
    handler: handler.getAlbumLikesHandler,
  },
];

module.exports = routes;
