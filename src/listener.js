const autoBind = require('auto-bind');
class Listener {
  constructor(playlistsongsService, mailSender) {
    this.playlistsongsService = playlistsongsService;
    this.mailSender = mailSender;

    autoBind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlistOfSongs = await this.playlistsongsService.getSongsInPlaylistById(playlistId);
      const result = await this.mailSender.sendEmail(targetEmail, JSON.stringify(playlistOfSongs));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
