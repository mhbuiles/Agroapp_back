const nodemailer = require('nodemailer');

const mailstyles = {
  container : 'background-color: #e1f7f7; border: 2px solid #333; display: flex; flex-direction: column; align-items: center',
  image : 'width: 500px; height: 500px',
}

module.exports = {
  transporter : nodemailer.createTransport({
    host : 'smtp-mail.outlook.com',
    port : 587,
    secure : false,
    auth : {
      user : process.env.MAIL_USER,
      pass : process.env.MAIL_PASS,
    }
  }),
  welcome(name) {
    return {
      html : `
        <div style="${mailstyles.container}">
          <body>
            <h1>AgroApp</h1>
            <h2>Bienvenido a la nueva forma de conectar el campo con la ciudad, ${name}.<br/>Empiez a usar tu app para vender y comprar productos ya!</h2>
            <img style="${mailstyles.image}" src = "https://www.urnadecristal.gov.co/sites/default/files/Campo.jpeg" />
          </body>
        </div>
      `
    }
  },
  async verify(transporter) {
    try{
      const isConnected = await transporter.verify();
      console.log( 'Servidor listo para recibir mensajes' , isConnected );
    }
    catch  (error) {console.log('error')} ;

  }
}
