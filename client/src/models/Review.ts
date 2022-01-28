import { timestamp } from "../utilities/timestamp";
import { uuid } from "../utilities/uuid";

export default class Review implements ReviewData {
    public id: string;
    public restaurantId: string;
    public userId: string;
    public rating: number;
    public title: string;
    public content: string;
    public timestamp: string;
    public isEdited: boolean;

    public constructor(data: ReviewData) {
        this.id = data.id;
        this.restaurantId = data.restaurantId;
        this.userId = data.userId;
        this.rating = data.rating;
        this.title = data.title;
        this.content = data.content;
        this.timestamp = data.timestamp;
        this.isEdited = data.isEdited;
    }

    public static getMockReview() {
        return new Review({
            id: "review-id",
            restaurantId: "restaurant-id",
            userId: "user-id",
            rating: 4.4,
            title: "My review of this restaurant",
            content: "This restaurant is great!",
            timestamp: timestamp(),
            isEdited: false,
        });
    }

    public static getEmpty(restaurantId: string, userId: string) {
        return {
            id: uuid(),
            restaurantId,
            userId,
            title: "",
            content: "",
            rating: 0.0,
            timestamp: timestamp(),
            isEdited: false,
        } as ReviewData;
    }
}

export interface ReviewData {
    id: string;
    restaurantId: string;
    userId: string;
    title: string;
    content: string;
    rating: number;
    timestamp: string;
    isEdited: boolean;
}
