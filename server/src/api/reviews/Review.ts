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

    public static toJSON(data: any) {
        // return as ReviewData from snake case
        return {
            id: data.id,
            restaurantId: data.restaurant_id,
            userId: data.user_id,
            rating: data.rating,
            title: data.title,
            content: data.content,
            timestamp: data.timestamp,
            isEdited: data.is_edited,
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
