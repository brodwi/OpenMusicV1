require('dotenv').config();
const amqp = require('amqplib');
const PlaylistsService = require('./playlistsService');
const MailSender = require('./MailSender');
const Listener = require('./Listener');

const init = async() => {

    const playlistsService = new PlaylistsService();
    const mailSender = new MailSender();
    const listener = new Listener(playlistsService, mailSender);
    console.log("tes")
    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);

    const channel = await connection.createChannel();
    //console.log(channel);
    await channel.assertQueue('export:playlists', {
        durable: true,
    });
    //const queue = 'export:playlists';
    channel.consume('export:playlists', listener.listen, { noAck: true })

    // channel.consume(queue, (message) => {
    //     console.log(`Menerima pesan dari queue ${queue}: ${message.content.toString()}`);
    // }, { noAck: true });
}
init();