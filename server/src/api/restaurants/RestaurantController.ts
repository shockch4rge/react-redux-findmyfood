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
}
