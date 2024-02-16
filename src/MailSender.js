const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(targetEmail, content) {
    try {
      const mailOptions = {
        from: 'openmusiclover@email.com',
        to: targetEmail,
        subject: 'export playlist songs',
        text: 'terlampir hasil dari ekspor playlist',
        attachments: {
          filename: 'songs-playlist.json',
          content,
        },
      };

      return this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

module.exports = MailSender;
