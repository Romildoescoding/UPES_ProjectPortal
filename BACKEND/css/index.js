import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import nodemailer from "nodemailer";
import cors from "cors";
import session from "express-session"; // Import session middleware
import connectPgSimple from "connect-pg-simple";

// Database connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "login",
  password: "ROMIL2004",
  port: 5432,
});
db.connect();

// Session store using PostgreSQL
const pgSession = connectPgSimple(session);

const app = express();
const port = 3000;

//middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Session configuration
app.use(
  session({
    store: new pgSession({
      pool: db, // Connection pool
      tableName: "session", // Use another table-name than the default "session" one
    }),
    secret: "Romildoescoding", // Set a secret key for session encryption
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1800000 }, // COOKIE would be set for 30 minutes i.e 30 * 60 * 1000
  })
);

// Debugging middleware to log session details
app.use((req, res, next) => {
  console.log("Session details:", req.session);
  next();
});

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
  const { email, password, role } = req.body;
  console.log(req.body.email);
  console.log(req.body.password);

  try {
    let result;
    if (role === "student") {
      result = await db.query("SELECT * FROM students WHERE email = $1;", [
        email,
      ]);
    } else {
      result = await db.query("SELECT * FROM users WHERE email = $1;", [email]);
    }
    console.log("Query Result:", result.rows);
    if (result.rows.length > 0) {
      const userPassword = result.rows[0].passwords;

      if (password === userPassword) {
        req.session.user = result.rows[0];
        // console.log("Session before save:", req.session);

        req.session.save((err) => {
          if (err) {
            console.error("Session save error:", err);
            return res.status(500).json({ error: "Session save error" });
          }
        });
        console.log("Session after save:", req.session);
        res.status(200).json({
          ...result.rows[0],
          authenticated: true,
          role,
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
  console.log("THE AUTHEnTICATE");
  console.log(req.session);
  res.json(req.session);
  // if (req.session.user) {
  //   res.json({ user: req.session.user });
  // } else {
  //   res.status(401).json({ error: "Not authenticated" });
  // }
});

app.post("/addMembers", async (req, res) => {
  console.log(req.body);
  const teamName = req.body.team;
  const member1 = req.body.member1;
  const member2 = req.body.member2;
  const member3 = req.body.member3;

  try {
    const result = await db.query(
      "UPDATE teams SET member1 = $1, member2 = $2, member3 = $3 WHERE teamName = $4",
      [member1, member2, member3, teamName]
    );

    const teamData = await db.query("SELECT * FROM teams WHERE teamName = $1", [
      teamName,
    ]);

    res.status(200).json({
      res: 200,
      status: "ok",
      ...teamData.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
      inserted: false,
      realError: err,
    }); // Send JSON response for internal server error
  }
});

app.post("/addTeam", async (req, res) => {
  const teamName = req.body.teamName;
  const leader = req.body.leader;
  const leaderSap = req.body.leaderSap;
  const leaderMail = req.body.leaderMail;

  // const { teamName, leader, leaderMail, leaderSap } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO teams(teamName, leader, member1, member2, member3) VALUES ($1,$2,$3,$4,$5)",
      [teamName, leader, null, null, null]
    );

    res.status(200).json({
      res: 200,
      status: "ok",
      teamName,
      leader,
      leaderSap,
      leaderMail,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
      inserted: false,
      realError: err,
    }); // Send JSON response for internal server error
  }
});

app.post("/getTeam", async (req, res) => {
  console.log("THE REQ-BODY IS :=", req.body);
  console.log(req.body.username);
  console.log(req.session?.user?.username);

  let username = req.body.username;
  username =
    username?.slice(0, 1)?.toUpperCase() + username?.slice(1)?.toLowerCase();
  try {
    const result = await db.query(
      "SELECT * FROM teams WHERE leader = $1 OR member1 = $1 or member2 = $1 OR member3 = $1;",
      [username]
    );
    console.log("Query Result of getTeam:", result.rows);
    if (result.rows.length > 0) {
      res.status(200).json({ res: 200, status: "ok", ...result.rows[0] });
    }
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
      inserted: false,
      realError: err,
    }); // Send JSON response for internal server error
  }
});

app.post("/requestMentorship", async (req, res) => {
  // const faculty = req.body.faculty;
  const mail = req.body.facultyMail;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1;", [
      mail,
    ]);

    if (result.rows.length > 0) {
      const facultyName = result.rows[0].name;
      const facultyMail = result.rows[0].email;
      const role = result.rows[0].role;

      if (role === "faculty") {
        //Adding request to another table called MentorshipRequests o structure teamID, teamName, facultyRequestsed, status
        const { teamId, teamName } = req.body;
        const result = await db.query(
          "INSERT INTO mentorshipRequests(teamId, teamName, faculty, requestStatus) VALUES ($1,$2,$3,$4)",
          [teamId, teamName, facultyName, "pending"]
        );

        res.status(200).json({
          facultyName,
          facultyMail,
          isFaculty: true,
          teamId,
          teamName,
          requestStatus: "pending",
        });
      } else {
        res.status(401).json({
          error: "Details entered for is not a faculty",
          isFaculty: false,
        }); // Not a faculty
      }
    } else {
      res.status(404).json({ error: "Faculty not found", isFaculty: false }); // Faculty not found
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
      inserted: false,
      realError: err,
    }); // Send JSON response for internal server error
  }
});

app.post("/getRequests", async (req, res) => {
  // const faculty = req.body.faculty;
  const faculty = req.body.username;

  try {
    const result = await db.query(
      "SELECT * FROM mentorshipRequests WHERE faculty = $1;",
      [faculty]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ ...result.rows });
    } // Not a faculty
    else {
      res.status(404).json({ error: "No requests found", isFaculty: false }); // Faculty not found
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
      inserted: false,
      realError: err,
    }); // Send JSON response for internal server error
  }
});

app.post("/handleRequests", async (req, res) => {
  console.log(req.body);
  const { requestStatus, teamid } = req.body;
  try {
    await db.query(
      "UPDATE mentorshipRequests SET requestStatus = $1 WHERE teamid = $2",
      [requestStatus, teamid]
    );

    res.status(200).json(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
      inserted: false,
      realError: err,
    }); // Send JSON response for internal server error
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
