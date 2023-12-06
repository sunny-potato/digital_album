import express from "express";
import {
  checkUsernameValidation,
  createNewUser,
} from "../controllers/signup.controller";

const router = express.Router();

router.get(`/`, checkUsernameValidation);

router.post(`/newuser`, createNewUser);

export default router;
