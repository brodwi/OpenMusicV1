class Listener {
    constructor(playlistsService, mailSender) {
        this._playlistsService = playlistsService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }
    async listen(message) {
        try {
            const { playlistId, targetEmail } = JSON.parse(message.content.toString());
            const playlistsData = await this._playlistsService.getPlaylists(playlistId);
            const songs = await this._playlistsService.getSongs(playlistId);
            const result = await this._mailSender.sendEmail(
                targetEmail,
                JSON.stringify({
                    playlists: {
                        id: playlistsData.id,
                        name: playlistsData.name,
                        songs
                    }
                }),
            )
        } catch (error) {
            console.error(error);

        }
    }
}
module.exports = Listener;