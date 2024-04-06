const mailer = require('nodemailer');

const transporter = mailer.createTransporter({
    service: 'Gmail',
    auth: {
        user: 'user email',
        pass: 'new password'
    }
})