import ReviewRepository from "../repositories/ReviewRepository";
import { Request, Response } from "express";

export default class ReviewController {
    public readonly reviewRepository: ReviewRepository;

    public constructor() {
        this.reviewRepository = new ReviewRepository();
    }

    // TODO fix promise returns
    public async getReview(request: Request, response: Response) {
        const id = request.params.id;

        try {
            const result = await this.reviewRepository.get(id);
            response.json(result);
        }
        catch (err) {
            response.json(err);
        }
    }

    public async deleteReview(request: Request, response: Response) {
        const id = request.params["id"];

        try {
            await this.reviewRepository.delete(id);
            response.status(200);
        }
        catch (err) {
            response.json(err);
        }
    }

    public async updateReview(request: Request, response: Response) {
        const id = request.body.id

        try {
            await this.reviewRepository.update(id, { ...request.body })
            response.status(200);
        }
        catch (err) {
            response.json(err);
        }
    }

    public async addReview(request: Request, response: Response) {
        try {
            await this.reviewRepository.add({ ...request.body });
            response.json({ message: "Added review!" });
        }
        catch (err) {
            response.json(err);
        }
    }

    public async getRestaurantReviews(request: Request, response: Response) {
        const id = request.params.id;

        try {
            const reviews = await this.reviewRepository.getRestaurantReviews(id);
            response.json(reviews);
        }
        catch (err) {
            response.json(err);
        }
    }
}