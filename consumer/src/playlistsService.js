const { Pool } = require('pg');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }


    async getPlaylists(playlistId) {
        const query = {
            text: 'select id,name from playlists where id = $1',
            values: [playlistId],
        }

        const result = await this._pool.query(query);
        return result.rows[0];
    }

    async getSongs(playlistId) {
        const query = {
            text: 'select songs.id, songs.title, songs.performer from songs left join playlist_songs on songs.id = playlist_songs.song_id where playlist_songs.playlist_id = $1',
            values: [playlistId]
        }

        const result = await this._pool.query(query);
        // console.log(result);

        return result.rows;
    }


}

module.exports = PlaylistsService;