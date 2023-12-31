const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require('dotenv').config({ path: "../.env" });
const OAuth2 = google.auth.OAuth2;
const handleBars = require("nodemailer-express-handlebars");
const path = require('path');

//Credentials
const clientID = process.env.GOOGLE_CLIENT_ID;
const secretKey = process.env.GOOGLE_SECRET_KEY;
const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
const gcpUser = process.env.GCP_USER;

const OAuth2_client = new OAuth2(clientID, secretKey);
OAuth2_client.setCredentials({ refresh_token: refreshToken })

function sendEmail(
  name,
  recipient,
  confirmationCode,
  templateName,
  emailSender,
  emailSubject,
  emailMessage
) {
  const accessToken = OAuth2_client.getAccessToken()

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: gcpUser,
      clientId: clientID,
      clientSecret: secretKey,
      refreshToken: refreshToken,
      accessToken: accessToken,
    },
  });

  const handlebarOption = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("../../React-Portfolio-Website/server/public/emailTemplate"),
      defaultLayout: false,
    },
    viewPath: path.resolve("../../React-Portfolio-Website/server/public/emailTemplate"),
    extName: ".handlebars",
  };

  transport.use("compile", handleBars(handlebarOption));

  const mailOptions = {
    from: `<${gcpUser}>`,
    to: recipient,
    subject: "A Message From Nikola Uzunov",
    template: templateName,
    context: {
      name: name,
      confirmationCode: confirmationCode,
      emailSender: emailSender,
      emailSubject: emailSubject,
      emailMessage: emailMessage,
    },
  };

  transport.sendMail(mailOptions, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Message was Successfully Sended", result);
    }
    transport.close();
  });
}

module.exports = sendEmail;