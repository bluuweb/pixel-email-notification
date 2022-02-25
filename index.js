const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.use(express.static(__dirname + "/public"));

app.get("/the-office.gif", async (req, res) => {
    console.log("alguien hizo la solicitud");

    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });

    const options = {
        from: "desafio <no-reply@su-dominio.com>",
        to: "correo@correo.com",
        subject: "Enviado desde heroku 🔥",
        text: "Se abrío el correo electrónico",
    };

    try {
        const info = await transporter.sendMail(options);
        // console.log(info);
        res.sendFile(__dirname + "/public/img/the-office.gif");
    } catch (error) {
        return res.end("mensaje fallido");
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("funcionando 🎉"));
