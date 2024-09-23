import express from "express";

const router = express.Router();

import {
  createGroup,
  getAllGroups,
  getMembersInfo,
  updateMembers,
} from "../controllers/groupController.js";

router.route("/").get(getAllGroups).post(createGroup).patch(updateMembers);
router.route("/members").get(getMembersInfo);

export default router;
