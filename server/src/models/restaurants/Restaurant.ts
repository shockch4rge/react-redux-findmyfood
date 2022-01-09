export default class Restaurant implements RestaurantData {
    public id: string;
    public name: string;
    public description: string;
    public averageRating: number;
    public cuisine: string;
    public telephone: string;
    public address: string;
    public availableTimes: AvailableTimesData;
    public imageUrl: string;

    public constructor(data: RestaurantData) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.averageRating = data.averageRating;
        this.cuisine = data.cuisine;
        this.telephone = data.telephone;
        this.address = data.address;
        this.availableTimes = data.availableTimes;
        this.imageUrl = data.imageUrl;
    }

    public static getMockRestaurant() {
        return new Restaurant({
            id: "restaurant-id",
            name: "Mock Dining",
            description:
                "This is the restaurant's description, lengthened out to make for some boilerplate text that fills up some space on a screen or a box.",
            averageRating: 4.2,
            cuisine: "Mock Food",
            address: "Mock Street 42",
            telephone: "91234567",
            availableTimes: {
                openingHours: "12:00",
                closingHours: "23:59",
                days: ["Monday", "Tuesday"],
            },
            imageUrl: "https://restaurant_url.com",
        });
    }
}

export interface RestaurantData {
    id: string;
    name: string;
    description: string;
    address: string;
    telephone: string;
    averageRating: number;
    cuisine: string;
    availableTimes: AvailableTimesData;
    imageUrl: string;
}

export interface AvailableTimesData {
    days: string[];
    openingHours: string;
    closingHours: string;
}
