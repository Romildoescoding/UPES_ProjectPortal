import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import nodemailer from "nodemailer";

const app = express();
const port = 3000;

// Database connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "Tanishq@0512",
  port: 5432,
});
db.connect();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'vandanabhay1997@gmail.com', // Your Gmail email address
    pass: 'tanishq@0512'    // Your Gmail password
  }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      const result = await db.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, password]
      );

      // Send email upon successful registration
      const mailOptions = {
        from: 'vandanabhay1997@gmail.com',
        to: email,
        subject: 'Welcome to Our Application!',
        text: `Hello,\n\nWelcome to our application! We're excited to have you on board.\n\nBest regards,\nYour Application Team`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      if (password === storedPassword) {
        res.render("secrets.ejs");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
