import jwt from "jsonwebtoken"; // Import JWT package
import bcrypt from "bcrypt";
import supabase from "../supabase.js";

export async function loginStudent(req, res) {
  try {
    let { mail, password } = req.body;
    // const { email, password } = req.body;
    let { data: user, error } = await supabase
      .from("students")
      .select("*")
      .eq("mail", mail);

    if (error) throw new Error("Error while fetching in supabase");

    if (!user.length)
      res.status(404).json({
        status: "fail",
        message: "Invalid username or password",
        authenticated: false,
      });

    console.log(password, user[0].password);
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    console.log(isPasswordValid);
    if (isPasswordValid) {
      const token = jwt.sign(
        { role: "student", ...user[0] }, // payload
        process.env.JWT_SECRET, // secret key
        { expiresIn: "1h" } // token expiration time
      );

      res.status(200).json({
        status: "success",
        token,
        data: { user: user[0], role: "student", authenticated: true },
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

    if (error) throw new Error("Error while fetching in supabase");

    if (!user.length)
      res.status(404).json({
        status: "fail",
        message: "Invalid username or password",
        authenticated: false,
      });

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (isPasswordValid) {
      const token = jwt.sign(
        { role: "faculty", ...user[0] }, // payload
        process.env.JWT_SECRET, // secret key
        { expiresIn: "1h" } // token expiration time
      );

      res.status(200).json({
        status: "success",
        token,
        data: { user: user[0], role: "faculty", authenticated: true },
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
      .from("faculty")
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

      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update the student's password in the database
      const { error: updateError } = await supabase
        .from("faculty")
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

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update the student's password in the database
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

//FACULTY
export async function setPassword(req, res) {
  try {
    // Retrieve the email and new password from the request body
    const { mail, password } = req.body;

    // Query the faculty by email
    let { data: faculty, error: selectError } = await supabase
      .from("faculty") // Ensure the table name is correct
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
      .from("faculty") // Ensure the table name is correct
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
