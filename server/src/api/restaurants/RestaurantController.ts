import { Request, Response } from "express";
import Restaurant, { RestaurantData } from "./Restaurant";
import RestaurantRepository from "./RestaurantRepository";

export default class RestaurantController {
    public static async get(request: Request, response: Response) {
        try {
            const restaurant = await RestaurantRepository.get(request.params.id);
            response.json(Restaurant.toJSON(restaurant));
        } catch (err) {
            response.json(err);
        }
    }

    public static async getAll(request: Request, response: Response) {
        try {
            const restaurants = await RestaurantRepository.getAll();
            response.json(restaurants.map(r => Restaurant.toJSON(r)));
        } catch (err) {
            response.json(err);
        }
    }

    public static async add(request: Request, response: Response) {
        try {
            await RestaurantRepository.add(request.body);
            response.json("Added restaurant!");
        } catch (err) {
            response.status(500).send(err);
        }
    }

    public static async updateRating(request: Request, response: Response) {
        try {
            await RestaurantRepository.updateRating(request.params.id, request.body.rating);
            response.json("Updated restaurant rating!");
        } catch (err) {
            response.status(500).send(err);
        }
    }
}
