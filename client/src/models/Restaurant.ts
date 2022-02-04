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
