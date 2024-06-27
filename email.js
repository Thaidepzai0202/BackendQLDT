const http = require("http");
const nodemailer = require("nodemailer");
require('dotenv').config();

const server = http.createServer((request, response) => {
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: 'nguyenthethai02022001@gmail.com',
            pass: 'sbcz ygmm axzs clxl'
        }
    });

    const receiver = {
        from: 'nguyenthethai02022001@gmail.com',
        to: "nguyenthethai02022001@gmail.com",
        subject: "Node Js Mail Testing!",
        text: "Hello this is a text mail!"
    };

    auth.sendMail(receiver, (error, emailResponse) => {
        if (error) {
            console.error("Failed to send email:", error);
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end("Failed to send email.");
        } else {
            console.log("Email sent successfully!");
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end("Email sent successfully.");
        }
    });
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
