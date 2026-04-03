export const newsletterThanksTemplate = (userEmail) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Thanks for Subscribing</title>
  </head>

  <body style="margin:0;padding:0;background-color:#fff;font-family:Arial,Helvetica,sans-serif;">

    <table align="center" width="100%" cellpadding="0" cellspacing="0"
      style="max-width:600px;margin:40px auto;background:#f4f6f8;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">

      <!-- Header -->
      <tr>
        <td style="background:#71AC11;padding:30px;text-align:center;color:#ffffff;">
          <h1 style="margin:0;font-size:24px;">🎉 Welcome to Grocify Newsletter!</h1>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:40px 30px;color:#333333;">

          <p style="font-size:16px;margin:0 0 15px;">
            Hi there,
          </p>

          <p style="font-size:15px;line-height:1.7;margin:0 0 20px;">
            Thank you for subscribing to our newsletter with <b>${userEmail}</b>.
          </p>

          <p style="font-size:15px;line-height:1.7;margin:0 0 20px;">
            You’ll now be the first to receive:
          </p>

          <ul style="font-size:14px;line-height:1.8;color:#444;margin:0 0 25px 18px;padding:0;">
            <li>🛒 Latest grocery deals & discounts</li>
            <li>🚀 New product launches</li>
            <li>💡 Healthy tips & recipes</li>
            <li>🎁 Exclusive subscriber-only offers</li>
          </ul>

          <div style="text-align:center;margin:30px 0;">
            <a href="http://localhost:5173/" style="
              background:#71AC11;
              color:#ffffff;
              text-decoration:none;
              padding:12px 28px;
              border-radius:6px;
              font-size:14px;
              display:inline-block;
            ">
              Start Shopping
            </a>
          </div>

          <p style="font-size:13px;color:#777;margin-top:25px;text-align:center;">
            If you did not subscribe, you can safely ignore this email.
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