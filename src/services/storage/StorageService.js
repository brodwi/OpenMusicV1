/* eslint-disable require-jsdoc */
const fs = require('fs');
const {Pool} = require('pg');

class StorageService {
  constructor(folder, cacheService) {
    this._folder = folder;
    this._pool = new Pool();
    this._cacheService = cacheService;


    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, {recursive: true});
    }
  }

  writeFile(file, meta) {
    const filename = +new Date() + meta.filename;
    const path = `${this._folder}/${filename}`;

    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error)=>reject(error));
      file.pipe(fileStream);
      file.on('end', ()=>resolve(filename));
    });
  }
  async addAlbumCover(filename, albumId) {
    const query = {
      text: 'UPDATE albums SET cover = $1 WHERE id = $2',
      values: [filename, albumId],
    };
    await this._pool.query(query);
    await this._cacheService.delete(`album:${albumId}`);
  }
}

module.exports = StorageService;
