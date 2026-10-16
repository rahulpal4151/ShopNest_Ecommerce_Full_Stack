const sendEmail = require("./sendEmail");

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

const sendOtpEmail = async (user, otp) => {
  const name = escapeHtml(user.name);
  const text = `Hi ${user.name}, your ShopNest verification code is ${otp}. It expires in 10 minutes.`;
  const html = `
    <div style="background:#f4f4f5;padding:32px 16px;font-family:Arial,sans-serif;color:#18181b">
      <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:16px;padding:32px">
        <p style="margin:0 0 8px;color:#f97316;font-size:13px;font-weight:bold;letter-spacing:2px">SHOPNEST</p>
        <h1 style="margin:0 0 16px;font-size:24px">Verify your email</h1>
        <p style="line-height:1.6">Hi ${name}, use this one-time code to finish creating your account:</p>
        <div style="margin:24px 0;padding:18px;background:#fff7ed;border-radius:12px;text-align:center;color:#c2410c;font-size:32px;font-weight:bold;letter-spacing:8px">${otp}</div>
        <p style="line-height:1.6;color:#52525b">This code expires in 10 minutes. If you didn't request it, you can ignore this email.</p>
      </div>
    </div>`;

  return sendEmail(user.email, "ShopNest - Verify your email", { text, html });
};

module.exports = sendOtpEmail;
