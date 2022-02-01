export default class Reply implements ReplyData {
    public id: string;
    public reviewId: string;
    public userId: string;
    public content: string;
    public timestamp: string;
    public isEdited: boolean;

    public constructor(data: ReplyData) {
        this.id = data.id;
        this.reviewId = data.reviewId;
        this.userId = data.userId;
        this.content = data.content;
        this.timestamp = data.timestamp;
        this.isEdited = data.isEdited;
    }

    public static toJSON(data: any) {
        return {
            id: data.id,
            reviewId: data.review_id,
            userId: data.user_id,
            content: data.content,
            timestamp: data.timestamp,
            isEdited: data.is_edited,
        } as ReplyData;
    }
}

export interface ReplyData {
    id: string;
    reviewId: string;
    userId: string;
    content: string;
    timestamp: string;
    isEdited: boolean;
}
