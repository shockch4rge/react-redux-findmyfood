export default class User implements UserData {
    public id: string;
    public firstName: string;
    public lastName: string;
    public gender: string;
    public username?: string;
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
}

export interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    gender: string;
    username?: string;
    email: string;
    password: string;
    address: string;
    telephone: string;
    activated: boolean;
    avatarPath: string;
}
