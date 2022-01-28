import config from "../../../config.json";

export default class User implements UserData {
    public id: string;
    public username: string;
    public firstName: string;
    public lastName: string;
    public gender: string;
    public avatarPath: string;
    public email: string;
    public password: string;
    public address: string;
    public telephone: string;
    public activated: boolean;

    public constructor(data: UserData) {
        this.id = data.id;
        this.username = data.username;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.gender = data.gender;
        this.avatarPath = data.avatarPath;
        this.email = data.email;
        this.password = data.password;
        this.address = data.address;
        this.telephone = data.telephone;
        this.activated = data.activated;
    }

    public static toJSON(data: any) {
        return {
            id: data.id,
            username: data.username,
            firstName: data.first_name,
            lastName: data.last_name,
            gender: data.gender,
            avatarPath: `${config.api.baseUrl}/uploads/${data.avatar_path}`,
            email: data.email,
            password: data.password,
            address: data.address,
            telephone: data.telephone,
            activated: data.activated,
        } as UserData;
    }
}

export interface UserData {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    gender: string;
    avatarPath: string;
    email: string;
    password: string;
    address: string;
    telephone: string;
    activated: boolean;
}
