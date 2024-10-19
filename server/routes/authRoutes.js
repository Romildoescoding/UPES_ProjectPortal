import express from "express";

const router = express.Router();

import {
  currentUser,
  getRemoteVariables,
  isAuthorized,
  loginFaculty,
  loginStudent,
  setPassword,
  setPassword1,
  setPasswords,
  updateRemoteVariables,
} from "../controllers/authController.js";

router.route("/").get(isAuthorized, currentUser);
router.route("/login/student").post(loginStudent);
router.route("/login/faculty").post(loginFaculty);
router.route("/login/student/passwords").get(setPasswords);
router.route("/login/student/password").get(setPassword1);
router.route("/variables").get(getRemoteVariables).patch(updateRemoteVariables);

export default router;
