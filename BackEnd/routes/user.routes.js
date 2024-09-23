import express from "express";
import protectedRoutes from "../middlewares/protectedRoutes.js";
import { getUserForSidebars } from "../controllers/user.controller.js";

const router = express.Router()

router.get("/",protectedRoutes,getUserForSidebars);

export default router;