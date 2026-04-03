export const forgotPasswordOtpTemplate = (otp, userName) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Password Reset OTP</title>
  </head>

  <body style="margin:0;padding:0;background-color:#fff;font-family:Arial,Helvetica,sans-serif;">

    <table align="center" width="100%" cellpadding="0" cellspacing="0"
      style="max-width:600px;margin:40px auto;background:#f4f6f8;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">

      <!-- Header -->
      <tr>
        <td style="background:#71AC11;padding:30px;text-align:center;color:#ffffff;">
          <h1 style="margin:0;font-size:24px;">Reset Your Password</h1>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:40px 30px;color:#333333;">

          <p style="font-size:16px;margin:0 0 15px;">
            Hi ${userName || "User"},
          </p>

          <p style="font-size:15px;line-height:1.6;margin:0 0 25px;">
            We received a request to reset your password. Please use the OTP below to continue.
          </p>

          <!-- OTP Box -->
          <div style="text-align:center;margin:30px 0;">
            <div style="
              display:inline-block;
              background:#ffffff;
              padding:18px 40px;
              font-size:28px;
              letter-spacing:8px;
              font-weight:bold;
              color:#71AC11;
              border-radius:8px;
              border:2px dashed #71AC11;
            ">
              ${otp}
            </div>
          </div>

          <b>
            <p style="font-size:13px;color:#999;margin-top:25px;text-align:center;">
              This OTP will expire in 5 minutes.
            </p>
          </b>

          <p style="font-size:13px;color:#999;margin-top:10px;text-align:center;">
            If you didn’t request this, please ignore this email.
          </p>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f4f6f8;padding:20px;text-align:center;font-size:12px;color:#888;">
          © ${new Date().getFullYear()} Grocify. All rights reserved.
        </td>
      </tr>

    </table>

  </body>
  </html>
  `;
};