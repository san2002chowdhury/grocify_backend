export const orderDeliveredTemplate = (userName, order) => {
    const itemsHtml = order.items
        .map(
            (item) => `
      <tr>
        <td style="padding:12px 8px;border-bottom:1px solid #e5e7eb;font-size:14px;color:#333;">
          ${item.name}
        </td>

        <td style="padding:12px 8px;border-bottom:1px solid #e5e7eb;font-size:14px;color:#333;text-align:center;">
          ${item.quantity}
        </td>

        <td style="padding:12px 8px;border-bottom:1px solid #e5e7eb;font-size:14px;color:#333;text-align:right;">
          ₹${item.price}
        </td>
      </tr>
    `
        )
        .join("");

    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Order Delivered</title>
  </head>

  <body style="margin:0;padding:0;background-color:#fff;font-family:Arial,Helvetica,sans-serif;">

    <table align="center" width="100%" cellpadding="0" cellspacing="0"
      style="max-width:600px;margin:40px auto;background:#f4f6f8;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">

      <tr>
        <td style="background:#71AC11;padding:30px;text-align:center;color:#ffffff;">
          <h1 style="margin:0;font-size:24px;">Order Delivered Successfully!</h1>
          <p style="margin:6px 0 0;font-size:14px;">Thank you for shopping with us</p>
        </td>
      </tr>

      <tr>
        <td style="padding:40px 30px;color:#333333;">

          <p style="font-size:16px;margin:0 0 15px;">
            Hi ${userName || "User"},
          </p>

          <p style="font-size:15px;line-height:1.6;margin:0 0 20px;">
            Great news! Your order has been successfully delivered. We hope you loved your purchase.
          </p>

          <div style="background:#ffffff;padding:15px;border-radius:8px;border:1px solid #e5e7eb;margin-bottom:25px;">
            <p style="margin:0 0 8px;font-size:14px;"><b>Order ID:</b> ${String(
        order?._id
    ).slice(-6)}</p>

            <p style="margin:0 0 8px;font-size:14px;"><b>Delivered On:</b> ${new Date(
        order.updatedAt
    ).toDateString()}</p>

            <p style="margin:0;font-size:14px;">
              <b>Shipping Address:</b><br/>
              ${order.shippingAddress.landmark}, ${order.shippingAddress.city}, ${order.shippingAddress.state
        }
            </p>
          </div>

          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:20px;">

            <tr style="background:#e8f5e9;">
              <td style="padding:12px 8px;font-size:15px;font-weight:bold;color:#111;border-bottom:2px solid #71AC11;">
                Product
              </td>

              <td style="padding:12px 8px;font-size:15px;font-weight:bold;color:#111;border-bottom:2px solid #71AC11;text-align:center;">
                Qty
              </td>

              <td style="padding:12px 8px;font-size:15px;font-weight:bold;color:#111;border-bottom:2px solid #71AC11;text-align:right;">
                Price
              </td>
            </tr>

            ${itemsHtml}

          </table>

          <div style="text-align:right;margin-top:20px;font-size:16px;font-weight:bold;">
            Total Paid: ₹${order.totalAmount}
          </div>

          <p style="margin-top:30px;font-size:14px;color:#555;text-align:center;">
            We hope to see you again soon ❤️
          </p>

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