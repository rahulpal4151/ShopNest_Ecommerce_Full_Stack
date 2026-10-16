const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, content) => {
  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error("MAIL_USER and MAIL_PASS must be configured in backend/.env");
  }

  const mailPassword = process.env.MAIL_PASS.replace(/\s/g, "");
  const port = Number(process.env.MAIL_PORT || 465);
  const secure = process.env.MAIL_SECURE
    ? process.env.MAIL_SECURE === "true"
    : port === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || "smtp.gmail.com",
    port,
    secure,
    auth: {
      user: process.env.MAIL_USER,
      pass: mailPassword,
    },
  });

  return transporter.sendMail({
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to,
    subject,
    ...(typeof content === "string" ? { text: content } : content),
  });
};

module.exports = sendEmail;
