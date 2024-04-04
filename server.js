
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Assuming you're using Hostinger's email service
        auth: {
            user: 'conan.yogesh@gmail.com', // Replace with your email address
            pass: 'tmuu tjjm gygc myai', // Replace with your email password
        },
    });

    const mailOptions = {
        from: email,
        to: "yogeshmalkani28@gmail.com", // Replace with recipient email
        subject: 'Website Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Email sending failed');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get('/test', (req, res) => {
    console.log(req)


    7//    
    res.send('reponse234')
})

