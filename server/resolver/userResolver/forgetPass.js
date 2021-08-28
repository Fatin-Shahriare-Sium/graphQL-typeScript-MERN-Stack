
let nodemailer = require('nodemailer');
let bcrypt = require('bcrypt')

const User = require('../../model/user');

let forgetPassMutationResolver = async (parent, args, ctx) => {
    let { email } = args
    let userx = await User.findOne({ email })
    let x = await bcrypt.hashSync(userx.password, 11)

    var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "d928505033d79d",
            pass: "eac0ee713d3a7f"
        }
    });
    const message = {
        from: `Graphql<graphql@socia.com>`,
        to: `${email}`,
        subject: 'Forget Password',
        text: `Your password is ${userx.x}`
    };

    await transporter.sendMail(message, (error, info) => {
        if (error) {
            return console.log(error);
        }
        return console.log(info);
    })


}

module.exports = forgetPassMutationResolver