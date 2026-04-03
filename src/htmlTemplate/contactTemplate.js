export const contactTemplate = (name, email, message) => {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Thanks for Contacting Us</title>
  </head>

  <body style="margin:0;padding:0;background-color:#fff;font-family:Arial,Helvetica,sans-serif;">

    <table align="center" width="100%" cellpadding="0" cellspacing="0"
      style="max-width:600px;margin:40px auto;background:#f4f6f8;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">

    
      <tr>
        <td style="background:#71AC11;padding:30px;text-align:center;color:#ffffff;">
          <h1 style="margin:0;font-size:24px;">📩 Message Received!</h1>
        </td>
      </tr>

     
      <tr>
        <td style="padding:40px 30px;color:#333333;">

          <p style="font-size:16px;margin:0 0 15px;">
            Hi ${name || "User"},
          </p>

          <p style="font-size:15px;line-height:1.7;margin:0 0 20px;">
            Thank you for contacting <b>Grocify</b>. We have received your message and our support team will get back to you as soon as possible.
          </p>

         
          <div style="background:#ffffff;padding:15px;border-radius:8px;border:1px solid #e5e7eb;margin-bottom:25px;">
            <p style="margin:0 0 8px;font-size:14px;"><b>Your Email:</b> ${email}</p>
            <p style="margin:0;font-size:14px;"><b>Your Message:</b></p>
            <p style="margin-top:8px;font-size:14px;color:#555;line-height:1.6;">
              ${message}
            </p>
          </div>

          <p style="font-size:14px;color:#777;">
            We usually reply within <b>24 hours</b>.
          </p>

          <div style="text-align:center;margin:30px 0;">
            <a href="https://grocify-frontend-ttg2.onrender.com" style="
              background:#71AC11;
              color:#ffffff;
              text-decoration:none;
              padding:12px 28px;
              border-radius:6px;
              font-size:14px;
              display:inline-block;
            ">
              Visit Grocify
            </a>
          </div>

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