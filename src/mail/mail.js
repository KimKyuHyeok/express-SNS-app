const mailer = require('nodemailer');
const {goodbye} = require("./goodbye_template");
const {welcome} = require("./welcome_template");
require('dotenv').config();

const getMailData = (to, name, template) => {
    let data = null;

    switch (template) {
        case 'welcome':
            data = {
                from: '보내는 사람 이름 <userId@gmail.com>',
                to,
                subject: `Hello ${name}`,
                html: welcome,
            }
            break;
        case 'goodbye':
            data = {
                from: '보내는 사람 이름 <userId@gmail.com>',
                to,
                subject: `Goodbye ${name}`,
                html: goodbye,
            }
            break;
        default:
            data;
    }

    return data;
}

const sendMail = (to, name, type) => {
    const transporter = mailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GOOGLE_APP_ID,
            pass: process.env.GOOGLE_APP_PASS
        }
    })

    const mail = getMailData(to, name, type);

    transporter.sendMail(mail, (error, response) => {
        if (error) {
            console.log('Mail send Error : ' + error);
        } else {
            console.log('email sent successfully : ' + to.id);
        }
    })
}

module.exports = sendMail;