require('dotenv').config();

const amqp = require('amqplib');
const MailSender = require('./MailSender');
const SongsPlaylistService = require('./SongsPlaylistService');
const Listener = require('./listener');

const init = async () => {
  const songsPlaylistService = new SongsPlaylistService();
  const mailSender = new MailSender();
  const listener = new Listener(songsPlaylistService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlistTrack', {
    durable: true,
  });

  channel.consume('export:playlistTrack', listener.listen.bind(listener), { noAck: true });
};

init();
