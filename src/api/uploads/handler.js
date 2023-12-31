/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const config = require('../../utils/config');

class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUploadAlbumCoverHandler = this.postUploadAlbumCoverHandler.bind(this);
  }

  async postUploadAlbumCoverHandler(request, h) {
    const {cover} = request.payload;
    const {id} = request.params;
    this._validator.validateImageHeaders(cover.hapi.headers);

    const filename = await this._service.writeFile(
        cover,
        cover.hapi,
    );

    const coverUrl = `http://${process.env.HOST}:${process.env.PORT}/uploads/images/${filename}`;
    await this._service.addAlbumCover(coverUrl, id);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
