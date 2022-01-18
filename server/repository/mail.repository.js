const nodemailer = require('nodemailer')
const fs = require('fs')
const { configuration } = require('../config/config')

const htmlTemplate = function (name, require) {
  return fs.readFileSync(require.resolve(name)).toString()
}

const { host, port, secure, disableFileAccess, disableUrlAccess } = configuration.mailer;
const { user, pass } = configuration.mailer.auth
const from = user
let transport = null

class MailRepository {
  static async createTransport() {
    let secureConverted
    if (secure !== undefined) secureConverted = secure === 'true' ? true : false
    secureConverted = transport = nodemailer.createTransport(
      {
        host,
        port: parseInt(port, 10),
        secure: secureConverted,
        auth: {
          user,
          pass,
        },
        disableFileAccess,
        disableUrlAccess,
      },
      {
        // Default options for the message. Used if specific values are not set
        from,
      }
    )
  }

  static async getTransport() {
    if (transport == null) {
      try {
        await this.createTransport()
      } catch (error) {
        console.error('Error on create transport: ', error)
      }
    }
    return transport
  }

  static async sendMail(body) {
    try {
      let htmlData
      let subject

      htmlData = htmlTemplate('../template/template-support-message.html', require)
      // htmlData = htmlData.replace('{{sender}}', body.sender)
      // htmlData = htmlData.replace('{{message}}', body.message)
      // htmlData = htmlData.replace('{{link}}', body.link)
      // htmlData = htmlData.replace('{{finalMessage}}', body.finalMessage)
      subject = 'A new message has arrived for you.'

      const message = {
        from,
        to: body.email,
        subject,
        html: htmlData,
      }

      // Send the message using the previously set up Nodemailer transport
      const response = await new Promise(async (resolve, reject) => {
        const transport = await this.getTransport()
        transport.sendMail(message, (error, info) => {
          if (error) {
            return reject(error)
          }
          resolve(`Delivered message ${info.messageId}`)
        })
      })
      console.log(`sendEmail - response: ${response}`);
    } catch (error) {
      console.error(`Error on send mail: ${error}`)
    }
  }
}

module.exports = MailRepository
