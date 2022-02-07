import faker from "@faker-js/faker";

export default class Restaurant implements RestaurantData {
    public id: string;
    public name: string;
    public description: string;
    public averageRating: number;
    public cuisines: Cuisine[];
    public telephone: string;
    public address: string;
    public costScale: number;
    public availableTimes: AvailableTimesData;
    public imageUrl: string;

    public constructor(data: RestaurantData) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.averageRating = data.averageRating;
        this.costScale = data.costScale;
        this.cuisines = data.cuisines;
        this.telephone = data.telephone;
        this.address = data.address;
        this.availableTimes = data.availableTimes;
        this.imageUrl = data.imageUrl;
    }

    public static fake() {
        return {
            name: faker.company.companyName(),
            description: faker.lorem.paragraph(4),
            address: faker.address.streetAddress(),
            costScale: faker.random.number({ min: 1, max: 4 }),
            averageRating: faker.random.float({ min: 1, max: 5, precision: 0.5 }),
            availableTimes: {
                days: faker.random.arrayElements(
                    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    3
                ),
                closingHours: String(faker.random.number({ min: 13, max: 23 })),
                openingHours: String(faker.random.number({ min: 0, max: 12 })),
            },
            cuisines: faker.random.arrayElements([...Object.values(CUISINES)], 4),
            imageUrl: "https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784__340.jpg",
            telephone: faker.phone.phoneNumber("91234567"),
        } as Omit<RestaurantData, "id">;
    }

    public static toJSON(data: any): RestaurantData {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            address: data.address,
            telephone: data.telephone,
            averageRating: data.rating,
            costScale: data.costScale,
            cuisines: String(data.cuisine).split(", ") as Cuisine[],
            availableTimes: {
                days: String(data.days).split(", "),
                openingHours: data.opening_hours,
                closingHours: data.closing_hours,
            },
            imageUrl: data.image_url,
        }
    }
}

export interface RestaurantData {
    id: string;
    name: string;
    description: string;
    address: string;
    telephone: string;
    costScale: number;
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
