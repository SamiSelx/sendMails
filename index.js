const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const port = 8383;
app.use(express.static("./clients/public"));
app.use(express.json());

// app.get('/',(_req,res)=>{
//   res.status(200).send('<h1></h1>')
// })

app.post("/", (req, res) => {
  const { parcel } = req.body;

  if (!parcel) {
    return res.status(400).send({ status: "failed" });
  }
  console.log(parcel);
  const transporter = nodemailer.createTransport({
    service: "outlook",
    host: "smtp.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: parcel.email,
      pass: parcel.password,
    },
  });

  const mailInfo = {
    from: parcel.email,
    to: parcel.emailDest,
    subject: parcel.subject,
    text: parcel.text,
  };

  transporter.sendMail(mailInfo, async (err, info) => {
    if (!err) {
      res.status(200).send({
        status: "received",
        connect: "Account was succesfully connected",
        send: "Message was succesfully send",
      });
    } else {
      res.status(400).send({ status: "failed", error: err });
    }
  });
});

app.listen(port, () => console.log(`server started`));
