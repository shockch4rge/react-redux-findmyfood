export default class Restaurant implements RestaurantData {
    public id: string;
    public name: string;
    public description: string;
    public averageRating: number;
    public cuisines: Cuisine[];
    public telephone: string;
    public address: string;
    public availableTimes: AvailableTimesData;
    public imageUrl: string;

    public constructor(data: RestaurantData) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.averageRating = data.averageRating;
        this.cuisines = data.cuisines;
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
            averageRating: 4.3,
            cuisines: ["Asian", "Chinese", "Halal"],
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

    public static toJSON(data: any) {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            address: data.address,
            telephone: data.telephone,
            averageRating: data.rating,
            cuisines: String(data.cuisine).split(", "),
            availableTimes: {
                days: String(data.days).split(", "),
                openingHours: data.opening_hours,
                closingHours: data.closing_hours,
            },
            imageUrl: data.image_url,
        } as RestaurantData;
    }
}

export interface RestaurantData {
    id: string;
    name: string;
    description: string;
    address: string;
    telephone: string;
    averageRating: number;
    cuisines: Cuisine[];
    availableTimes: AvailableTimesData;
    imageUrl: string;
}

export interface AvailableTimesData {
    days: string[];
    openingHours: string;
    closingHours: string;
}

export type Cuisine = typeof CUISINES[keyof typeof CUISINES];

export const CUISINES = {
    halal: "Halal",
    local: "Local",
    western: "Western",
    mart: "Mart",
    noodles: "Noodles",
    seafood: "Seafood",
    fast_food: "Fast Food",
    dessert: "Dessert",
    indian: "Indian",
    chinese: "Chinese",
    japanese: "Japanese",
    thai: "Thai",
    burgers: "Burgers",
    healthy: "Healthy",
    korean: "Korean",
    asian: "Asian",
    sushi: "Sushi",
    vietnamese: "Vietnamese",
    italian: "Italian",
    mexican: "Mexican",
} as const;
