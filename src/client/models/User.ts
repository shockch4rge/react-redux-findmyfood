import { uuid } from "../utilities/uuid";

export default class User implements UserData {
    public id: string;
    public username?: string;
    public firstName: string;
    public lastName: string;
    // public gender: "Male" | "Female" | "Other";
    public gender: string;

    public constructor(data: UserData) {
        this.id = data.id;
        this.username = data.username;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.gender = data.gender;
    }

    public static getMockUser() {
        return new User({
            id: uuid(),
            firstName: "John",
            lastName: "Doe",
            gender: "Male",
            username: "CoolUsername123",
        });
    }
}

export interface UserData {
    id: string;
    username?: string;
    firstName: string;
    lastName: string;
    // gender: "Male" | "Female" | "Other";
    gender: string;
}
