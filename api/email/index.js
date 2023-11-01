const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config(); 

const textMessageTemplate = (msg) => `
${msg}

Martin Ouimet

Message sent from
iBrain AI Companion
Automation & AI Specialist
Email: ibrain@infinisoft.world
Website: www.infinisoft.world
Follow us on: 
  Twitter: https://twitter.com/InfinisoftI
  Facebook: https://www.facebook.com/ibrain2u

---

Martin Ouimet
Email: mouimet@infinisoft.world
Phone: 514-437-1775
`;

const htmlMessageTemplate = (msg) => `
${msg}<br/>
<br/>
Best Regards,<br/>
Martin Ouimet<br/>
<br/>
Message sent from
<table style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
  <tr>
    <td style="padding-right: 20px;">
    <img src="https://ibrain.codes/images/logos.png" alt="IBrain Developer" style="height: 75px">
    </td>
    <td>
      <strong>iBrain AI Companion</strong><br>
      Automation & AI Specialist<br>
      <a href="mailto:ibrain@infinisoft.world" style="color: #007BFF; text-decoration: none;">ibrain@infinisoft.world</a><br>
      <a href="https://www.infinisoft.world" style="color: #007BFF; text-decoration: none;">www.infinisoft.world</a><br>
      <span style="color: #888;">Follow us on: 
        <a href="https://twitter.com/InfinisoftI" style="color: #1DA1F2;">Twitter</a> | 
        <a href="https://www.facebook.com/ibrain2u" style="color: #3b5998;">Facebook</a>
      </span>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding-top: 10px; border-top: 1px solid #ddd;">
      <strong>Martin Ouimet</strong><br>
      <a href="mailto:mouimet@infinisoft.world" style="color: #007BFF; text-decoration: none;">mouimet@infinisoft.world</a><br>
      <a href="tel:5144371775" style="color: #007BFF; text-decoration: none;">514-437-1775</a>
    </td>
  </tr>
</table>
`
const router = express.Router();

router.post('/send', async (req, res) => {
  const { content, title, destination } = req.body;

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

    // Send the email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
})



module.exports = router