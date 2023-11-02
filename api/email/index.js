

// Updated code

const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const textMessageTemplate = (msg) => `\n${msg}\n\nMartin Ouimet\n\nMessage sent from iBrain AI Companion\nAutomation & AI Specialist\nEmail: ibrain@infinisoft.world\nWebsite: www.infinisoft.world\nFollow us on:\nTwitter: https://twitter.com/InfinisoftI\nFacebook: https://www.facebook.com/ibrain2u\n\n---\n\nMartin Ouimet\nEmail: mouimet@infinisoft.world\nPhone: 514-437-1775`;

const htmlMessageTemplate = (msg) => `\n${msg}<br/><br/>\nBest Regards,<br/>\nMartin Ouimet<br/><br/>\n\nMessage sent from\n<table style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">\n  <tr>\n    <td style="padding-right: 20px;">\n      <img src="https://ibrain.codes/images/logos.png" alt="IBrain Developer" style="height: 75px">\n    </td>\n    <td>\n      <strong>iBrain AI Companion</strong><br>\n      Automation & AI Specialist<br>\n      <a href="mailto:ibrain@infinisoft.world" style="color: #007BFF; text-decoration: none;">ibrain@infinisoft.world</a><br>\n      <a href="https://www.infinisoft.world" style="color: #007BFF; text-decoration: none;">www.infinisoft.world</a><br>\n      <span style="color: #888;">Follow us on:\n        <a href="https://twitter.com/InfinisoftI" style="color: #1DA1F2;">Twitter</a> |\n        <a href="https://www.facebook.com/ibrain2u" style="color: #3b5998;">Facebook</a>\n      </span>\n    </td>\n  </tr>\n  <tr>\n    <td colspan="2" style="padding-top: 10px; border-top: 1px solid #ddd;">\n      <strong>Martin Ouimet</strong><br>\n      <a href="mailto:mouimet@infinisoft.world" style="color: #007BFF; text-decoration: none;">mouimet@infinisoft.world</a><br>\n      <a href="tel:5144371775" style="color: #007BFF; text-decoration: none;">514-437-1775</a>\n    </td>\n  </tr>\n</table>`;

const router = express.Router();

router.post('/send', async (req, res) => {
  const { content, title, destination, attachment } = req.body;

  try {
    // Create a transporter object using SMTP
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: Boolean(process.env.SMTP_SECURE),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Configure the email options
    let mailOptions = {
      from: process.env.EMAIL_FROM,
      cc: process.env.EMAIL_FROM,
      to: destination,
      subject: title,
      text: textMessageTemplate(content),
      html: htmlMessageTemplate(content)
    };

    // Add attachment if attachmentPath is provided
    if (attachment) {
      const attachmentName = path.basename(attachment);
      const attachmentContent = fs.readFileSync(attachment);
      // Add attachment to mailOptions
      mailOptions.attachments = [
        {
          filename: attachmentName,
          content: attachmentContent
        }
      ];
    }

    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;  