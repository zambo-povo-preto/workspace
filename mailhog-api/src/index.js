import express from "express";
import nodemailer from "nodemailer";

const env = {
  PORT: 3002,
  SMTP_HOST: "mailhog-api",
  SMTP_PORT: 1025,
};

const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { from, to, subject, html } = req.body;

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false, // true para 465, false para outras portas
  });

  try {
    const result = await transporter.sendMail({ from, to, subject, html });

    console.log("Email Sent ID:", result.messageId);

    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({ error: "Error sending email", details: err });
  }
});

app.listen(env.PORT, () => {
  console.log(`Email server listening on port ${process.env.PORT}`);
});
