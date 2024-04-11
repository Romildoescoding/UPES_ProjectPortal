import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const port = 3000;

//middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "login",
  password: "ROMIL2004",
  port: 5432,
});
db.connect();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "vandanabhay1997@gmail.com", // Your Gmail email address
    pass: "tanishq@0512", // Your Gmail password
  },
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.render("home.ejs");
});

// app.get("/login", (req, res) => {
//   res.render("login.ejs");
// });

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
        from: "vandanabhay1997@gmail.com",
        to: email,
        subject: "Welcome to Our Application!",
        text: `Hello,\n\nWelcome to our application! We're excited to have you on board.\n\nBest regards,\nYour Application Team`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body.email);
  console.log(req.body.password);

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1;", [
      email,
    ]);
    console.log("Query Result:", result.rows);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const userPassword = user.passwd;
      const userEmail = user.email;
      const userId = user.user_id;

      if (password === userPassword) {
        res
          .status(200)
          .json({ userId, userEmail, userPassword, authenticated: true });
      } else {
        res
          .status(401)
          .json({ error: "Incorrect Password", authenticated: false }); // Send JSON response for incorrect password
      }
    } else {
      res.status(404).json({ error: "User not found", authenticated: false }); // Send JSON response for user not found
      // throw new Error("User not found");
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Internal Server Error", authenticated: false }); // Send JSON response for internal server error
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
