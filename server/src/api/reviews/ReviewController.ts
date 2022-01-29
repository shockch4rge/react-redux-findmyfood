import ReviewRepository from "./ReviewRepository";
import { Request, Response } from "express";

export default class ReviewController {
    public static async get(request: Request, response: Response) {
        const id = request.params.id;

        try {
            const result = await ReviewRepository.get(id);
            response.json(result);
        } catch (err) {
            response.json(err);
        }
    }

    public static async getByUserAndRestaurantId(request: Request, response: Response) {
        const userId = request.params.userId;
        const restaurantId = request.params.restaurantId;

        try {
            const review = await ReviewRepository.getByUserAndRestaurantId(userId, restaurantId);
            response.json(review);
        } catch (err) {
            response.status(500).send(err);
        }
    }

    public static async delete(request: Request, response: Response) {
        const id = request.params.id;

        try {
            await ReviewRepository.delete(id);
            response.json({ msg: "Deleted" });
        } catch (err) {
            response.json(err);
        }
    }

    public static async update(request: Request, response: Response) {
        const id = request.params.id;

        console.log(request.body);

        try {
            await ReviewRepository.update(id, { ...request.body });
            response.json({ msg: "Successfully updated!" });
        } catch (err) {
            response.json(err);
        }
    }

    public static async add(request: Request, response: Response) {
        try {
            await ReviewRepository.add({ ...request.body });
            response.json({ message: "Added review!" });
        } catch (err) {
            response.json(err);
        }
    }

    public static async getRestaurantReviews(request: Request, response: Response) {
        const id = request.params.restaurantId;

        try {
            const reviews = await ReviewRepository.getRestaurantReviews(id);
            response.json(reviews);
        } catch (err) {
            response.json(err);
        }
    }
}
