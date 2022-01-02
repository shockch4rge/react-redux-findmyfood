import PromiseRouter from "express-promise-router";
import ReviewController from "./controllers/ReviewController";
import UserController from "./controllers/UserController";

const router = PromiseRouter();

// Controllers
const userController = new UserController();
const reviewController = new ReviewController();

// Front-end testing
router.all("/api/test");

// User
router.get("/user/login", async (req, res) => await userController.loginUser(req, res));
router.post("/user/register", async (req, res) => await userController.registerUser(req, res));

// Review
router.get("/review/:id", async (req, res) => await reviewController.getReview(req, res));
router.post("/review/add", async (req, res) => await reviewController.addReview(req, res));

export default router;
