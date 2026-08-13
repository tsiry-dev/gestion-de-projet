import { HTTPSTATUS } from "@/config/http.config";
import { asyncHandler } from "@/middlewares/asyncHandler.middleware";
import { CommentService } from "@/services/comment.service";
import { createCommentSchema } from "@/shared/validators/comment.schema";
import { Request, RequestHandler, Response } from "express";

export class CommentController {

    private commentService;

    constructor() {
        this.commentService = new CommentService();
    }

    public create: RequestHandler = asyncHandler(
        async(req: Request, res: Response) => {
           const data = createCommentSchema.parse(req.body);
           const task = await this.commentService.create(
              data,
              req.user?.userId
           );
           
           return res.status(HTTPSTATUS.OK).json({
              message: "Commented!",
              task
           });
        }
    );

    public update: RequestHandler = asyncHandler(
        async(req: Request, res: Response) => {
           return res.status(HTTPSTATUS.OK).json({
              message: "Update comment!"
           })
        }
    );

    public remove: RequestHandler = asyncHandler(
        async(req: Request, res: Response) => {
           return res.status(HTTPSTATUS.OK).json({
              message: "Remove comment!"
           })
        }
    );
}