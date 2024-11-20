import jwt from "jsonwebtoken"; // Import JWT package
import bcrypt from "bcrypt";
import supabase from "../supabase.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid"; // For generating unique tokens

export async function loginStudent(req, res) {
  try {
    let { mail, password } = req.body;
    // const { email, password } = req.body;
    console.log(mail, password);
    let { data: user, error } = await supabase
      .from("students")
      .select("*")
      .eq("mail", mail);

    console.log(user);

    if (error) {
      console.log(error);
      return res.status(401).json({
        status: "fail",
        message: "Error while fetching in supabase",
        authenticated: false,
      });
    }

    if (!user.length)
      return res.status(404).json({
        status: "fail",
        message: "Invalid username or password",
        authenticated: false,
      });

    // console.log(password, user[0].password);
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    // console.log(isPasswordValid);
    if (isPasswordValid) {
      const token = jwt.sign(
        { role: "student", ...user[0] }, // payload
        process.env.JWT_SECRET, // secret key
        { expiresIn: "1h" } // token expiration time
      );

      res.status(200).json({
        status: "success",
        token,
        user: { ...user[0], role: "student", authenticated: true },
        // data: { user: user[0], role: "student", authenticated: true },
      });
    } else {
      res.status(401).json({
        status: "fail",
        message: "Invalid username or password",
        authenticated: false,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
      authenticated: false,
    });
  }
}

export async function loginFaculty(req, res) {
  try {
    let { mail, password } = req.body;
    // const { email, password } = req.body;
    let { data: user, error } = await supabase
      .from("faculty")
      .select("*")
      .eq("mail", mail);

    console.log(user);

    if (error) {
      console.log(error);
      return res.status(401).json({
        status: "fail",
        message: "Error while fetching in supabase",
        authenticated: false,
      });
    }

    if (!user.length)
      res.status(404).json({
        status: "fail",
        message: "Invalid username or password",
        authenticated: false,
      });

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (isPasswordValid) {
      const token = jwt.sign(
        { ...user[0] }, // payload
        process.env.JWT_SECRET, // secret key
        { expiresIn: "1h" } // token expiration time
      );

      res.status(200).json({
        status: "success",
        token,
        user: { ...user[0], role: "faculty", authenticated: true },
      });
    } else {
      res.status(401).json({
        status: "fail",
        message: "Invalid username or password",
        authenticated: false,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
      authenticated: false,
    });
  }
}

//script is used to set password for all the members in one go
//SET PASSWORDS FOR ALL FACULTY MEMBERS
export async function setPasswords(req, res) {
  try {
    // Retrieve all students
    let { data: faculties, error } = await supabase
      .from("students")
      .select("mail");

    if (error) {
      console.log(error);
      return res
        .status(400)
        .json({ status: "fail", message: "Failed to retrieve faculty" });
    }

    // Define characters for password generation
    const alphas = "ABCDEFGHIJKLMNOPQRTSUVWXYZ";
    const nums = "0123456789";

    for (let i = 0; i < faculties.length; i++) {
      let faculty = faculties[i];

      // Generate a new password for each student
      let newPassword =
        alphas.slice(i % alphas.length, (i + 3) % alphas.length) +
        nums.slice(i % nums.length, i + (3 % nums.length));

      console.log(faculty.mail, newPassword);

      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update the student's password in the database
      const { error: updateError } = await supabase
        .from("students")
        .update({ password: hashedPassword })
        .eq("mail", faculty.mail);

      if (updateError) {
        console.log(updateError);
        return res
          .status(400)
          .json({ status: "fail", message: "Failed to update password" });
      }
    }

    res.status(200).json({ status: "success", data: [] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
}

//STUDENT
export async function setPassword1(req, res) {
  console.log("RESET PASSWORD");
  console.log(req.body);
  try {
    // Retrieve the email and new password from the request body
    const { mail, password } = req.body;

    // Query the student by email
    let { data: student, error: selectError } = await supabase
      .from("students") // Ensure the table name is correct
      .select("mail")
      .eq("mail", mail)
      .single(); // Use .single() to get a single record

    if (selectError || !student) {
      console.log(selectError);
      return res
        .status(404) // Use 404 for not found
        .json({ status: "fail", message: "Student not found" });
    }

    console.log(student);

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the student's password in the database
    const { data, error: updateError } = await supabase
      .from("students") // Ensure the table name is correct
      .update({ password: hashedPassword })
      .eq("mail", mail);

    if (updateError) {
      console.log(updateError);
      return res
        .status(400)
        .json({ status: "fail", message: "Failed to update password" });
    }
    console.log(data);

    res.status(200).json({ status: "success", data: [] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
}

export async function setPasswordForMail() {}

//FACULTY
export async function setPassword11(req, res) {
  try {
    // Retrieve the email and new password from the request body
    const { mail, password } = req.body;

    // Query the faculty by email
    let { data: faculty, error: selectError } = await supabase
      .from("students") // Ensure the table name is correct
      .select("mail")
      .eq("mail", mail)
      .single(); // Use .single() to get a single record

    if (selectError || !faculty) {
      console.log(selectError);
      return res
        .status(404) // Use 404 for not found
        .json({ status: "fail", message: "Faculty not found" });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the faculty's password in the database
    const { error: updateError } = await supabase
      .from("students") // Ensure the table name is correct
      .update({ password: hashedPassword })
      .eq("mail", mail);

    if (updateError) {
      console.log(updateError);
      return res
        .status(400)
        .json({ status: "fail", message: "Failed to update password" });
    }

    res.status(200).json({ status: "success", data: [] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
}

export async function isAuthorized(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: "fail", message: "Unauthorized: No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to the request object
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ status: "fail", message: "Invalid token" });
  }
}

export async function currentUser(req, res) {
  try {
    // If the token is valid and user is authorized, req.user will be populated
    const user = req.user; // From isAuthorized middleware
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      status: "success",
      user, // Include user data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

//REMOTE VARIABLES FOR THE APP
export async function getRemoteVariables(req, res) {
  try {
    const { branch, type, mail } = req.query;

    if (mail !== "undefined") {
      console.log("MAIL Run");
      let { data: facultyData, error: facultyError } = await supabase
        .from("facultybranch")
        .select("*")
        .eq("mail", mail);

      if (facultyError) {
        return res
          .status(400)
          .json({ status: "fail", message: "Error fetching faculty branches" });
      }

      // Fetch all entries from the `variables` table
      const { data: variables, error: varError } = await supabase
        .from("variables")
        .select("*");

      if (varError) {
        console.log("Error fetching variables:", varError);
        return res
          .status(400)
          .json({ status: "fail", message: "Error fetching variables" });
      }

      // Filter locally based on `facultyData`
      const filteredVariables = variables.filter((variable) =>
        facultyData.some(
          (fac) => variable.branch === fac.branch && variable.type === fac.type
        )
      );

      // Respond with the filtered variables
      res.status(200).json({ status: "success", variables: filteredVariables });
    } else {
      let query = supabase.from("variables").select("*");
      if (branch) query = query.eq("branch", branch);
      if (type) query = query.eq("type", type);

      const { data: variablesData, error: variablesError } = await query;

      if (variablesError) {
        return res
          .status(400)
          .json({ status: "fail", message: "Error fetching variables" });
      }

      res.status(200).json({ status: "success", variables: variablesData });
    }

    // Step 4: Return the joined data
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

export async function updateRemoteVariables(req, res) {
  // branch: variable.branch,
  // type: variable.type,
  // value: visibility === "true" ? "false" : "true",
  try {
    const { branch, type, value } = req.body;
    const { data, error } = await supabase
      .from("variables")
      .update({ value })
      .eq("branch", branch)
      .eq("type", type)
      .select();

    if (error)
      res.status(400).json({ status: "fail", message: "Error while updating" });

    res.status(200).json({ status: "fail", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

// Function to send email
const sendResetEmail = async (mail, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const resetLink = `${process.env.PROJECT_URL}/reset-password/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: mail,
    subject: "Password Reset Request",
    html: `<p>You requested a password reset. Click the link below to reset your password:</p>
           <a href="${resetLink}">Reset Password</a>`,
  };

  await transporter.sendMail(mailOptions);
};

export async function passwordReset(req, res) {
  const { mail } = req.body;
  console.log(mail);

  // Determine user type
  const userType = mail.includes("@stu") ? "students" : "faculty";
  console.log(userType);

  try {
    // Check if the email exists in the corresponding table
    const { data: user, error: selectError } = await supabase
      .from(userType)
      .select("mail")
      .eq("mail", mail);
    // .single();

    console.log(user);

    if (selectError || !user.length) {
      console.log("EMAIL doesn't exist");
      return res
        .status(404)
        .json({ status: "fail", message: "Email does not exist" });
    }

    // Generate a unique token for the reset link
    const token = uuidv4();
    // Store the token in the database or a temporary store, linked to the user
    // You might want to create a separate table for storing tokens or add a column to your existing user table

    const { error } = await supabase
      .from("password_reset_tokens") // Assuming you have a table to store reset tokens
      .insert([
        {
          mail,
          token,
          expires_at: new Date(Date.now() + 60 * 60 * 1000), // Set to 1 hour from now
        },
      ]);

    if (error) {
      return res.status(404).json({ status: "fail", message: error });
    }

    // Send the reset email
    console.log(token);
    await sendResetEmail(mail, token);

    res.status(200).json({ status: "success", message: "Reset email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
}

export async function setPassword(req, res) {
  const { mail, password, token } = req.body;

  try {
    // Verify the token exists and is valid
    const { data: tokenData, error: tokenError } = await supabase
      .from("password_reset_tokens") // Your token storage table
      .select("*")
      .eq("token", token)
      .single();

    if (tokenError || !tokenData) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid or expired token" });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Determine user type
    const userType = mail.includes("@stu") ? "students" : "faculty";

    // Update the user's password in the corresponding table
    const { error: updateError } = await supabase
      .from(userType)
      .update({ password: hashedPassword })
      .eq("mail", mail);

    if (updateError) {
      return res
        .status(400)
        .json({ status: "fail", message: "Failed to update password" });
    }

    // Optionally, delete the token after use
    await supabase.from("password_reset_tokens").delete().eq("token", token);

    res
      .status(200)
      .json({ status: "success", message: "Password has been reset" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "An error occurred" });
  }
}

// Utility function to generate random passwords
const generateRandomPassword = (length = 8) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
};

// Function to send emails
const sendPasswordEmail = async (mail, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: mail,
    subject: "Your Login Credentails",
    html: `<p>You should reset your password.</p>
          <p>But for now, Please use the password below to log in:</p>
           <p><strong>${password}</strong></p>
           <a href="${process.env.PROJECT_URL}/signin" style="background:#43fa75; padding:5px; color:white">Access the Project Portal</a>`,
  };

  await transporter.sendMail(mailOptions);
};

// Main function to send password reset emails
export async function sendPassWordMail(req, res) {
  try {
    const { table } = req.params; // Either "student" or "faculty"

    if (!["student", "faculty"].includes(table)) {
      return res.status(400).json({ error: "Invalid user type" });
    }

    // Fetch all users from the specified table
    const { data: users, error: fetchError } = await supabase
      .from(table)
      .select("id, mail");

    if (fetchError) {
      console.error(fetchError);
      return res.status(500).json({ error: "Error fetching user data" });
    }

    // Process each user
    for (const user of users) {
      const randomPassword = generateRandomPassword(); // Generate a random password
      const hashedPassword = await bcrypt.hash(randomPassword, 10); // Hash the password

      // Update the user's password in Supabase
      const { error: updateError } = await supabase
        .from(table)
        .update({ password: hashedPassword })
        .eq("id", user.id);

      if (updateError) {
        console.error(`Error updating password for ${user.mail}:`, updateError);
        continue;
      }

      // Send the password via email
      await sendPasswordEmail(user.mail, randomPassword);
    }

    res
      .status(200)
      .json({ message: "Passwords updated and emails sent successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
}
