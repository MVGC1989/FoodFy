const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "09cfc5b72f911c",
        pass: "7fa153a501b6da"
    }
  });