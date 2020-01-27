const http = require('http')
const path = require('path')
const fs = require('fs')
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourmailid@gmail.com',
    pass: ''
    //get app password here.
    // https://support.google.com/accounts/answer/185833?hl=en
  }
});

var mailOptions = {
  from: 'xyz@gmail.com',
  to: 'abc@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};


const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-type': 'text/html' })
      res.end(content);
    })
  }
  if (req.url === '/success') {
    fs.readFile(path.join(__dirname, 'success.html'), (err, content) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-type': 'text/html' })
      res.end(content);
    })
  }
  if (req.url === '/submit') {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) throw error;
      res.writeHead(301,
        { Location: '/success' }
      );
      res.end();
    });
  }
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`${PORT} running`))