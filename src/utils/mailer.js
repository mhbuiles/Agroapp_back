const nodemailer = require('nodemailer');

const mailstyles = {
  container: 'background-color: #e1f7f7; border: 2px solid #333; display: flex; flex-direction: column; align-items: center',
  image: 'width: 500px; height: 500px',
}

module.exports = {
  transporter: nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    }
  }),
  welcome(name) {
    return {
      html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Demystifying Email Design</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>
      <body style="margin: 0; padding: 0;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
      <tr>
      <td>
      <tr>
      <td  align="center" style="padding: 40px 0 30px 0" bgcolor="#ffffff">
      <img src="https://res.cloudinary.com/dzhr3vbuj/image/upload/v1601688744/agroapp_products/logo_gy448h.png" alt="Creating Email Magic" width="161" style="display: block;" />
      </td>
      </tr>
      <tr>
      <td  align="center" style="padding: 40px 0 30px 0" bgcolor="#ffffff">
      AgroAppTitle email
      </td> 
      </tr>
      </td>
      </tr>
      <tr>
      <td  align="center" style="padding: 40px 0 30px 0" bgcolor="#ffffff">
      Bienvenido a la nueva forma de conectar el campo con la ciudad, ${name}.<br/>Empieza a usar tu app para vender y comprar productos ya!
      </td>
      </tr>
      <tr>
      <td align="center" style="padding: 40px 0 30px 0" bgcolor="#ffffff">
      <img src="https://www.urnadecristal.gov.co/sites/default/files/Campo.jpeg" width="400"/>
      </td>
      </tr>
      </table>
      </body> 
      </html>
      `
    }
  },
  purchase(name, value, products, invoice, transresp, epaycref) {

    let prodInfo = products.map(product =>
      `<p>${product.name}: COP$${product.price}, ubicado en ${product.location}.</p>`
    );

    return {
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Demystifying Email Design</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
        <body style="margin: 0; padding: 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td>
        <tr>
        <td  align="center" style="padding: 40px 0 30px 0" bgcolor="#ffffff">
        <img src="https://res.cloudinary.com/dzhr3vbuj/image/upload/v1601688744/agroapp_products/logo_gy448h.png" alt="Creating Email Magic" width="161" style="display: block;" />
        </td>
        </tr>
        <tr>
        <td  align="center" style="padding: 40px 0 30px 0" bgcolor="#ffffff">
        AgroAppTitle email
        </td> 
        </tr>
        </td>
        </tr>
        <tr>
        <td  align="center" style="padding: 40px 0 30px 0" bgcolor="#ffffff">
        <h2>Encuentra aquí un resumen de tu transacción, ${name}:</h2>
        <p>Valor: $${value}</p>
        <p>Estado de la transacción: ${transresp}</p>
        <p>Referencia transacción: ${epaycref}</p>
        <p>Número de factura: ${invoice}</p>
        <p>Ítems comprados: </p>
        <p>${prodInfo}</p>
        </td>
        </tr>
        <tr>
        <td align="center" style="padding: 40px 0 30px 0" bgcolor="#ffffff">
        <img src="https://www.urnadecristal.gov.co/sites/default/files/Campo.jpeg" width="400"/>
        </td>
        </tr>
        </table>
        </body> 
        </html>
        `
    }
  },
  async verify(transporter) {
    try {
      const isConnected = await transporter.verify();
      console.log('Servidor listo para recibir mensajes', isConnected);
    }
    catch (error) { console.log('error') };

  }
}
