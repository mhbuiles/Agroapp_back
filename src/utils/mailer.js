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
  welcome( name ) {
    return {
      html : `
        <div style="${mailstyles.container}">
          <body>
            <h1>AgroApp</h1>
            <h2>Bienvenido a la nueva forma de conectar el campo con la ciudad, ${name}.<br/>Empieza a usar tu app para vender y comprar productos ya!</h2>
            <img style="${mailstyles.image}" src = "https://www.urnadecristal.gov.co/sites/default/files/Campo.jpeg" />
          </body>
        </div>
      `
    }
  },
  purchase( name , value , products , invoice , transresp , epaycref ) {

    let prodInfo = products.map( product =>
        `<p>${product.name}: COP$${product.price}, ubicado en ${product.location}.</p>`
    );

    return {
      html : `
        <div style="${mailstyles.container}">
          <body>
          <div>
            <h1>AgroApp</h1>
            <h2>Encuentra aquí un resumen de tu transacción, ${name}:</h2>
            <p>Valor: $${value}</p>
            <p>Estado de la transacción: ${transresp}</p>
            <p>Referencia transacción: ${epaycref}</p>
            <p>Número de factura: ${invoice}</p>
            <p>Ítems comprados: </p>
            <p>${prodInfo}</p>
          </div>
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
