const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
var cors = require("cors");

dotenv.config();


const app = express();
app.use(cors());
const PORT = 3000;

app.use(express.json())

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Assuming you're using Hostinger's email service
        auth: {
            user: process.env.FROM_EMAIL, // Replace with your email address
            pass: process.env.EMAIL_PASSWORD, // Replace with your email password
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL,
        subject: 'Website Customer Query',
        text: `You have received a inquiry on your webite.\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Email sending failed');
        } else {
            res.send({ message: 'Query Sent!', success: true });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.get('/', (req, res) => {
    res.send('Running')
})

