import { Request, Response, response } from "express";
import RestaurantRepository from "./RestaurantRepository";

export default class RestaurantController {
    public static async get(request: Request, response: Response) {
        try {
            const restaurant = await RestaurantRepository.get(request.params.id);
            response.json(restaurant);
        }
        catch (err) {
            response.json(err);
        }
    }

}