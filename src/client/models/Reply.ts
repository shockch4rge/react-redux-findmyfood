export default class Reply implements ReplyData {
    public readonly id: string;
    public readonly reviewId: string;
    public readonly userId: string;
    public readonly content: string;
    public readonly timestamp: Date;
    public readonly isEdited: boolean;

    public constructor(data: ReplyData) {
        this.id = data.id;
        this.reviewId = data.reviewId;
        this.userId = data.userId;
        this.content = data.content;
        this.timestamp = data.timestamp;
        this.isEdited = data.isEdited;
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
