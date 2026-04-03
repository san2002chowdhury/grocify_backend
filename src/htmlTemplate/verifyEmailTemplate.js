export const verifyEmailTemplate = (verifyLink, userName) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Verify Your Email</title>
  </head>

  <body style="margin:0;padding:0;background-color:#fff;font-family:Arial,Helvetica,sans-serif;">

    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#f4f6f8;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">

     
      <tr>
        <td style="background:#71AC11;padding:30px;text-align:center;color:#ffffff;">
          <h1 style="margin:0;font-size:24px;">Verify Your Email</h1>
        </td>
      </tr>

      <tr>
        <td style="padding:40px 30px;color:#333333;">

          <p style="font-size:16px;margin:0 0 15px;">
            Hi ${userName || "User"},
          </p>

          <p style="font-size:15px;line-height:1.6;margin:0 0 25px;">
            Thanks for signing up! Please confirm your email address by clicking the button below.
          </p>

          <div style="text-align:center;margin:30px 0;">
            <a href="${verifyLink}"
               style="background:#71AC11;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:6px;font-size:16px;font-weight:bold;display:inline-block;">
               Verify Email
            </a>
          </div>
          <b>
            <p style="font-size:13px;color:#999;margin-top:25px;">
              This link will expire in 10 minutes.
            </p>
          </b>

        </td>
      </tr>

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