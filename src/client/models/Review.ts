import { timestamp } from "../utilities/timestamp";
import { uuid } from "../utilities/uuid";

export default class Review implements ReviewData {
    public id: string;
    public restaurantId: string;
    public userId: string;
    public title: string;
    public content: string;
    public rating: number;
    public timestamp: string;
    public isEdited: boolean;

    public constructor(data: ReviewData) {
        this.id = data.id;
        this.restaurantId = data.restaurantId;
        this.userId = data.userId;
        this.title = data.title;
        this.content = data.content;
        this.rating = data.rating;
        this.timestamp = data.timestamp;
        this.isEdited = data.isEdited;
    }

    public static getMockReview() {
        return new Review({
            id: uuid(),
            userId: uuid(),
            restaurantId: uuid(),
            title: "My review of this restaurant",
            content: "This restaurant is great!",
            rating: 4,
            timestamp: timestamp(),
            isEdited: false,
        })
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
