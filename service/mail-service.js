const nodemailer = require("nodemailer")

class MailService{
    // inisialozation Email Client
    constructor(){
        this.tranporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })
    }

    async sendMail(to, link){
       
        // this.tranporter.sendMail({
        //     from: process.env.SMTP_USER,
        //     to,
        //     text: "",
        //     subject: "Активация аккаунта!",
        //     html: `
        //     <div>
        //         <h1>Для активация аккаунта на ${process.env.API_URL} перейдите по ссылке!</h1>
        //         <a href="${process.env.API_URL}/${link}">${process.env.API_URL}/${link}</a> 
        //     </div>
        //     `
        // }, (err, data) => {
        //     if (err) {
        //         return console.log('Error occurs', err);
        //     }
        //     return console.log('Email sent!!!');
        // })
    }
}

module.exports = new MailService();