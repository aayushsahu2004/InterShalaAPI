const nodemailer = require("nodemailer");
const ErroHandler = require("./ErrorHandler");

exports.sendmail = (req, res, next, url) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: "Sahu Private Limited.",
        to: req.body.email,
        subject: "Password Reset Link",
        html: `<h1>Click Link blow to reset password</h1>
              <a href="${url}">Password Reset Link</a>`
    };

    transport.sendMail(mailOptions, (err, info) =>{
        if(err) {
            return next(new ErroHandler(err, 500));
        }
        console.log(info);
        return res.stutas(200).json({
            message:"mail send successfully",
            url
        });
    });
};