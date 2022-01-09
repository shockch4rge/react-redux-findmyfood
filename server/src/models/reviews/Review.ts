export default class Review implements ReviewData {
    public id: string;
    public restaurantId: string;
    public userId: string;
    public rating: number;
    public title: string;
    public content: string;
    public timestamp: Date;
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
            timestamp: new Date(Date.now()),
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
    timestamp: Date;
    isEdited: boolean;
}
