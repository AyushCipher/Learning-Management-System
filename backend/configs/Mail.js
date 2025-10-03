import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});


const sendMail = async (to, otp) => {
  await transporter.sendMail({
    from: `"Virtual Support Team" <${process.env.EMAIL}>`,
    to: to,
    subject: "🔐 Reset Your Password - OTP Verification",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Password Reset OTP</title>
    </head>
    <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f6f8;color:#333;">
      <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f4f6f8" style="padding:20px 0;">
        <tr>
          <td align="center">
            <table width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#ffffff" style="border-radius:8px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,0.1);">
              <tr>
                <td bgcolor="#007BFF" style="padding:20px;text-align:center;color:#ffffff;">
                  <h2 style="margin:0;font-size:24px;">Password Reset Request</h2>
                </td>
              </tr>
              <tr>
                <td style="padding:30px;">
                  <p style="font-size:16px;margin:0 0 15px;">Hello,</p>
                  <p style="font-size:16px;margin:0 0 15px;">
                    We received a request to reset your account password. Use the OTP below to proceed:
                  </p>
                  <div style="text-align:center;margin:30px 0;">
                    <span style="display:inline-block;background:#007BFF;color:#fff;padding:15px 25px;font-size:22px;font-weight:bold;border-radius:6px;letter-spacing:3px;">
                      ${otp}
                    </span>
                  </div>
                  <p style="font-size:16px;margin:0 0 15px;">
                    This OTP is valid for <b>5 minutes</b>. If you didn’t request a password reset, please ignore this email.
                  </p>
                  <p style="font-size:16px;margin:30px 0 0;">
                    Regards,<br/>
                    <b>Virtual Courses Support Team</b>
                  </p>
                </td>
              </tr>
              <tr>
                <td bgcolor="#f4f6f8" style="padding:15px;text-align:center;font-size:12px;color:#888;">
                  &copy; ${new Date().getFullYear()} Virtual Courses. All rights reserved.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `
  });
};


export default sendMail
