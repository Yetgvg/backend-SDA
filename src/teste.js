const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cloudsparkteam@gmail.com',
    pass: 'ktlp oakd uwsw xflk',
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Erro:', error);
  } else {
    console.log('Conexão com o SMTP foi bem-sucedida');
  }
});
