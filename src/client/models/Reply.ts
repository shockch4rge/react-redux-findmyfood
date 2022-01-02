import { timestamp } from "../utilities/timestamp";
import { uuid } from "../utilities/uuid";

export default class Reply implements ReplyData {
    public id: string;
    public reviewId: string;
    public userId: string;
    public content: string;
    public timestamp: Date;
    public isEdited: boolean;

    public constructor(data: ReplyData) {
        this.id = data.id;
        this.reviewId = data.reviewId;
        this.userId = data.userId;
        this.content = data.content;
        this.timestamp = data.timestamp;
        this.isEdited = data.isEdited;
    }

    public static getMockReply() {
        return new Reply({
            id: "reply-id",
            reviewId: "review-id",
            userId: "user-id",
            content: "I agree with this great review!",
            timestamp: new Date(Date.now()),
            isEdited: false,
        })
    }
}

export interface ReplyData {
    id: string;
    reviewId: string;
    userId: string;
    content: string;
    timestamp: Date;
    isEdited: boolean;
}
