import { uuid } from "../../utilities/uuid";

export default class User implements UserData {
    public id: string;
    public firstName: string;
    public lastName: string;
    public gender: string;
    public username?: string;
    public avatarUrl: string;

    public constructor(data: UserData) {
        this.id = data.id;
        this.username = data.username;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.gender = data.gender;
        this.avatarUrl = data.avatarUrl;
    }

    public static getMockUser() {
        return new User({
            id: "user-id",
            firstName: "John",
            lastName: "Doe",
            gender: "Male",
            username: "CoolUsername123",
            avatarUrl: "https://dwdkwdowk"
        });
    }
}

export interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    username?: string;
    avatarUrl: string;
}
