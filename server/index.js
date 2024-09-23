import express from "express";
import bodyParser from "body-parser";
// import nodemailer from "nodemailer";
import cors from "cors";
import jwt from "jsonwebtoken"; // Import JWT package

import supabase from "./supabase.js";

import facultyRoutes from "./routes/facultyRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import { isAuthorized } from "./controllers/authController.js";

const app = express();

//middleware
app.use(
  cors({
    //FRONTEND
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

// Increase the body size limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));

// Debugging middleware to log session details
// app.use((req, res, next) => {
//   console.log("Session details:", req);
//   next();
// });

// Nodemailer transporter setup
// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: "vandanabhay1997@gmail.com", // Your Gmail email address
//     pass: "tanishq@0512", // Your Gmail password
//   },
// });

//Routes
// app.use("/api/v1/faculty",isAuthorized,facultyRoutes);
app.use("/api/v1/faculty", facultyRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/groups", groupRoutes);
app.use("/api/v1/projects", projectRoutes);
// Routes

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
      // const mailOptions = {
      //   from: "vandanabhay1997@gmail.com",
      //   to: email,
      //   subject: "Welcome to Our Application!",
      //   text: `Hello,\n\nWelcome to our application! We're excited to have you on board.\n\nBest regards,\nYour Application Team`,
      // };

      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) {
      //     console.error("Error sending email:", error);
      //   } else {
      //     console.log("Email sent:", info.response);
      //   }
      // });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password, role } = req.body;
  // const { email, password } = req.body;

  try {
    let result;
    if (role === "student") {
      let { data, error } = await supabase
        .from("faculty")
        .select("*")

        // Filters
        .eq("column", "Equal to");

      //ERROR HANDLING
      if (error) {
        console.log(error);
        return;
      }
    } else {
      result = await db.query("SELECT * FROM users WHERE email = $1;", [email]);
    }
    console.log("Query Result:", result.rows);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Generate JWT Token
        const token = jwt.sign(
          { id: result.rows[0].id, email, role }, // payload
          process.env.JWT_SECRET, // secret key
          { expiresIn: "1h" } // token expiration time
        );

        // req.session.save((err) => {
        //   if (err) {
        //     console.error("Session save error:", err);
        //     return res.status(500).json({ error: "Session save error" });
        //   }
        // });
        // console.log("Session after save:", req.session);
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

app.get("/logout", async (req, res) => {
  console.log("THE BODY OF REQ FOR LOGOUT IS " + req);
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Session destroy error:", err);
        return res.status(500).json({ error: "Logout failed" });
      }

      console.log("Session destroyed successfully");
      res.status(200).json({ message: "Logout successful" });
    });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Logout failed" });
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
    await db.query(
      "UPDATE teams SET member1 = $1, member2 = $2, member3 = $3 WHERE teamName = $4",
      [member1, member2, member3, teamName]
    );

    const teamData = await db.query("SELECT * FROM teams WHERE teamName = $1", [
      teamName,
    ]);

    const leaderDetails = await db.query(
      "SELECT * FROM students WHERE email = $1",
      [teamData.rows[0].leader]
    );

    const membersData = await db.query(
      "SELECT * FROM students where email = $1 OR email = $2 OR email = $3",
      [member1, member2, member3]
    );

    const response = {
      teamName,
      leader: leaderDetails.rows[0],
      member1: membersData.rows[0],
      member2: membersData.rows[1],
      member3: membersData.rows[2],
    };

    res.status(200).json({
      res: 200,
      status: "ok",
      ...response,
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

  let user = req.body.user;
  // username =
  //   username?.slice(0, 1)?.toUpperCase() + username?.slice(1)?.toLowerCase();
  try {
    const teamData = await db.query(
      "SELECT * FROM teams WHERE leader = $1 OR member1 = $1 or member2 = $1 OR member3 = $1;",
      [user]
    );
    console.log("Query Result of getTeam:", teamData.rows);

    if (teamData.rows.length > 0) {
      const leaderDetails = await db.query(
        "SELECT * FROM students WHERE email = $1",
        [teamData.rows[0].leader]
      );

      const membersData = await db.query(
        "SELECT * FROM students where email = $1 OR email = $2 OR email = $3",
        [
          teamData.rows[0].member1,
          teamData.rows[0].member2,
          teamData.rows[0].member3,
        ]
      );

      const response = {
        teamName: teamData.rows[0].teamname,
        leader: leaderDetails.rows[0],
        member1: membersData.rows[0],
        member2: membersData.rows[1],
        member3: membersData.rows[2],
      };

      console.log(response);

      res.status(200).json({
        res: 200,
        status: "ok",
        ...response,
      });
    } else {
      res.status(404).json({
        error: "No Team Found",
      });
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

app.post("/addTeam", async (req, res) => {
  const teamName = req.body.teamName;
  const leader = req.body.leader;
  const leaderSap = req.body.leaderSap;
  const leaderMail = req.body.leaderMail;

  // const { teamName, leader, leaderMail, leaderSap } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO teams(teamName, leader, member1, member2, member3) VALUES ($1,$2,$3,$4,$5)",
      [teamName, leaderMail, null, null, null]
    );

    res.status(200).json({
      res: 200,
      status: "ok",
      message: "Team initiated successfully",
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

export default app;
