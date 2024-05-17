import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import nodemailer from "nodemailer";
import cors from "cors";
import session from "express-session"; // Import session middleware

// npm install connect-pg-simple

// import session from "express-session";
// import connectPgSimple from "connect-pg-simple";

// const pgSession = connectPgSimple(session);

// // Database connection
// const db = new pg.Client({
//   user: "postgres",
//   host: "localhost",
//   database: "login",
//   password: "ROMIL2004",
//   port: 5432,
// });
// db.connect();

// app.use(
//   session({
//     store: new pgSession({
//       pool: db, // Use the PostgreSQL database instance
//       createTableIfMissing: true, // Create the session table if it doesn't exist
//     }),
//     secret: "Romildoescoding", // Set a secret key for session encryption
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );

const app = express();
const port = 3000;

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    secret: "Romildoescoding", // Set a secret key for session encryption
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true, maxAge: 60000 },
    cookie: { secure: false },
  })
);

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
      const role = user.role;

      if (password === userPassword) {
        req.session.user = { userId, userEmail, role };
        console.log(req.session);
        req.session.save();
        res.status(200).json({
          userId,
          userEmail,
          userPassword,
          role,
          authenticated: true,
        });
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
// const requireAuth = (req, res, next) => {
//   if (req.session.user) {
//     next(); // User is authenticated, proceed to the next middleware or route handler
//   } else {
//     res.status(401).json({ error: "Not authenticated" }); // User is not authenticated, send an error response
//   }
// };

app.get("/authenticate", (req, res) => {
  console.log(req.session);
  if (!req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

app.get("/addTeam", async (req, res) => {
  const teamName = req.body.teamName;
  const member1 = req.body.member1;
  const member2 = req.body.member2;
  const member3 = req.body.member3;

  try {
    const result = await db.query(
      "INSERT INTO teams(teamName, member1, member2,member3) VALUES ($1,$2,$3,$4)",
      [teamName, member1, member2, member3]
    );

    res.status(200).json({
      teamName,
      member1,
      member2,
      member3,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error", inserted: false }); // Send JSON response for internal server error
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
