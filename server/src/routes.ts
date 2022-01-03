import PromiseRouter from "express-promise-router";
import ReplyController from "./controllers/ReplyController";
import ReviewController from "./controllers/ReviewController";
import UserController from "./controllers/UserController";

const router = PromiseRouter();

// Controllers
const userController = new UserController();
const reviewController = new ReviewController();
const replyController = new ReplyController();

// Front-end testing
router.get("/api/test", async (req, res) => res.json({ message: "nice" }));

// User and Account
router.get("/user/login", async (req, res) => await userController.loginUser(req, res));
router.post("/user/register", async (req, res) => await userController.registerUser(req, res));
router.put("/user/:id/update", async (req, res) => await userController.updateUser(req, res));

// Review and Reply
router.get("/review/:id", async (req, res) => await reviewController.getReview(req, res));
router.get("/review/:reviewId/replies", async (req, res) => await replyController.getReviewReplies(req, res))
router.post("/review/post", async (req, res) => await reviewController.addReview(req, res));
router.get("/review/:reviewId/replies/:replyId", async (req, res) => await replyController.getReply(req, res));
router.post("/review/:reviewId/replies/post", async (req, res) => await replyController.addReply(req, res))
router.put("/review/:reviewId/replies/:replyId", async (req, res) => await replyController.updateReply(req, res))

export default router;
