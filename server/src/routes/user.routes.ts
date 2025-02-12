import express from "express";
import { getAllUser, removeUser } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.route("/:id").delete(removeUser);

export default userRouter;
