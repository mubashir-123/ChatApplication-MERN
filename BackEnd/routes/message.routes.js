import express from "express";
import {sendMessage, getMessages} from "../controllers/message.controllers.js"
import protectedRoutes from "../middlewares/protectedRoutes.js";

const router = express.Router()

router.get("/:id",protectedRoutes,getMessages);
router.post("/send/:id",protectedRoutes,sendMessage);

export default router;