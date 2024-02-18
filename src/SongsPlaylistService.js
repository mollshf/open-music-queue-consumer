const { Pool } = require('pg');

class SongsPlaylistService {
  constructor() {
    this.pool = new Pool();
  }
  async getSongsInPlaylistById(id) {
    const query = {
      text: `
        SELECT 
          playlists.id AS id, 
          playlists.name AS name, 
          json_agg(json_build_object('id', songs.id, 'title', songs.title, 'performer', songs.performer)) AS songs 
        FROM 
          playlists 
        JOIN 
          playlists_songs ON playlists_songs.playlist_id = playlists.id 
        JOIN 
          songs ON songs.id = playlists_songs.song_id 
        JOIN 
          users ON users.id = playlists.owner 
        WHERE 
          playlists.id = $1 
        GROUP BY 
          playlists.id, playlists.name, users.username;
`,
      values: [id],
    };

    const result = await this.pool.query(query);

    if (result.rows.length > 0) {
      const data = result.rows[0];
      return {
        playlist: {
          id: data.id,
          name: data.name,
          songs: data.songs,
        },
      };
    }

    return null;
  }
}

module.exports = SongsPlaylistService;
