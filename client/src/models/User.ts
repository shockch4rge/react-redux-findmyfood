import { uuid } from "../utilities/uuid";

export default class User implements UserData {
    public id: string;
    public username: string;
    public firstName: string;
    public lastName: string;
    public gender: string;
    public email: string;
    public password: string;
    public address: string;
    public telephone: string;
    public activated: boolean;
    public avatarPath: string;

    public constructor(data: UserData) {
        this.id = data.id;
        this.username = data.username;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.gender = data.gender;
        this.email = data.email;
        this.password = data.password;
        this.address = data.address;
        this.telephone = data.telephone;
        this.activated = data.activated;
        this.avatarPath = data.avatarPath;
    }

    public static getEmpty() {
        return {
            id: uuid(),
            firstName: "",
            lastName: "",
            gender: "",
            username: "",
            email: "",
            password: "",
            address: "",
            telephone: "",
            activated: false,
            avatarPath: "",
        } as UserData;
    }

    public static getMockUser() {
        return new User({
            id: "user-id",
            firstName: "Lorem",
            lastName: "Ipsum",
            username: "UserName123",
            address: "User Address 1",
            avatarPath: "3643cd92-8526-44f7-ba94-4e92d51d57a1.png",
            activated: false,
            email: "user1@gmail.com",
            gender: "Male",
            password: "UserPassword1",
            telephone: "94827854"
        } as UserData);
    }
}

export interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    username: string;
    email: string;
    password: string;
    address: string;
    telephone: string;
    activated: boolean;
    avatarPath: string;
}
