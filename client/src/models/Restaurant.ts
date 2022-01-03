export default class Restaurant implements RestaurantData {
    public readonly id: string;
    public readonly name: string;
    public readonly description: string;
    public readonly averageRating: number;
    public readonly cuisine: string;
    public readonly telephone: string;
    public readonly address: string;

    public constructor(data: RestaurantData) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.averageRating = data.averageRating;
        this.cuisine = data.cuisine;
        this.telephone = data.telephone;
        this.address = data.address;
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
}

export interface ImageData {
    restaurantId: string;
    url: string;
}

export interface AvailableTimesData {
    restaurantId: string;
    days: Days[];
    openingHours: string;
    closingHours: string;
}

export type Days = keyof typeof Day;

const Day = {
    MONDAY: "Monday",
    TUESDAY: "Tuesday",
    WEDNESDAY: "Wednesday",
    THURSDAY: "Thursday",
    FRIDAY: "Friday",
    SATURDAY: "Saturday",
    SUNDAY: "Sunday",
} as const;
