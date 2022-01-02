import { v4 as uuidv4 } from "uuid";

export default class Restaurant implements RestaurantData {
    public readonly id: string;
    public readonly name: string;
    public readonly description: string;
    public readonly averageRating: number;
    public readonly cuisine: string;
    public readonly telephone: string;
    public readonly address: string;
    public readonly imageUrls: string[];
    public readonly availableTimes: AvailableTimes;

    public constructor(data: RestaurantData) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.averageRating = data.averageRating;
        this.cuisine = data.cuisine;
        this.telephone = data.telephone;
        this.address = data.address;
        this.imageUrls = data.imageUrls;
        this.availableTimes = data.availableTimes;
    }

    public static getMockRestaurant() {
        return new Restaurant({
            id: "restaurant-id",
            name: "Mock Dining",
            description:
                "This is the restaurant's description, lengthened out to make for some boilerplate text that fills up some space on a screen or a box.",
            availableTimes: {
                days: "MONDAY",
                openingHours: "12:00",
                closingHours: "24:00",
            },
            averageRating: 4.2,
            cuisine: "Mock Food",
            imageUrls: ["url1", "url2", "url3"],
            address: "Mock Street 42",
            telephone: "91234567",
        });
    }
}

export interface RestaurantData {
    id: string;
    name: string;
    description: string;
    averageRating: number;
    cuisine: string;
    telephone: string;
    address: string;
    imageUrls: string[];
    availableTimes: AvailableTimes;
}

export type AvailableTimes = {
    days: Days;
    openingHours: string;
    closingHours: string;
};

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
