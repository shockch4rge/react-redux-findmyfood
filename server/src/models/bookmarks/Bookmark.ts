export default class Bookmark implements BookmarkData {
    public id: string;
    public userId: string;
    public restaurantId: string;
    
    public constructor(data: BookmarkData) {
        this.id = data.id;
        this.userId = data.userId;
        this.restaurantId = data.restaurantId;
    }
}

export interface BookmarkData {
    id: string;
    userId: string;
    restaurantId: string;
}