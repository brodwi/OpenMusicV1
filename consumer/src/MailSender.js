const nodemailer = require('nodemailer');

class MailSender {
    constructor() {
        this._transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "b00a3cf47b41dd",
              pass: "22d3c7f34b318e"
            }
          });
    }

    sendEmail(targetEmail, content) {
        const message = {
            from: 'OpenMusic Apps',
            to: targetEmail,
            subject: 'Expor Catatan',
            text: 'TERLAMPIR HASIL DARI Export playlists',
            attachments: [{
                filename: 'playlist.json',
                content,
            }]
        };

        return this._transporter.sendMail(message);
    }
}

module.exports = MailSender;