import { CommentController } from "@/controllers/comment.controller";
import { Router } from "express";

const commentRoutes = Router();
const commentController = new CommentController();

commentRoutes.post("/create",commentController.create);
commentRoutes.patch("/update",commentController.update);
commentRoutes.delete("/remove",commentController.remove);

export default commentRoutes;