import nodemailer from 'nodemailer';

class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    //   user: process.env.EMAIL_USER, 
    //   pass: process.env.EMAIL_PASS,
      user: "cloudsparkteam@gmail.com", 
      pass: "fnrfbrhmwmhzpsjl",  
    },
  });

  async enviarEmail(destinatario: string, assunto: string, mensagem: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: destinatario,
      subject: assunto,
      text: mensagem,
    };

    console.log(mailOptions);
    await this.transporter.sendMail(mailOptions);
  }
}

export default new EmailService();
