import nodemailer from 'nodemailer'
const { google } = require("googleapis")

const CLIENT_ID = "80688403213-ev4ru35h4dff7pc7qdk2ic1637upjkpb.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//04_fGX48ChlHKCgYIARAAGAQSNgF-L9Ir6sVygmnMEE6P7CD_vRuiQKrG7PSs0HKxitDDL_axktynNZUqR6xbfis4LjgcbWcsOA"

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

class MailingService {
    async sendMail(email, subject, body) {
        const accessToken = oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "cs308myaraba@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
            tls: {
                rejectUnauthorized: true,
            },
        })
        const mailOptions = {
            from: "CarWow <cs308myaraba@gmail.com>",
            to: email,
            subject,
            text: body
        }
        return await transport.sendMail(mailOptions)
    }
}

export default MailingService