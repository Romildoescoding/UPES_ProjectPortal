import express from "express";

const router = express.Router();

import {
  currentUser,
  isAuthorized,
  loginFaculty,
  loginStudent,
  setPassword,
  setPasswords,
} from "../controllers/authController.js";

router.route("/").get(isAuthorized, currentUser);
router.route("/login/student").post(loginStudent);
router.route("/login/faculty").post(loginFaculty);
router.route("/login/student/passwords").get(setPasswords);
router.route("/login/student/password").get(setPassword);

export default router;
