export default class Account implements AccountData {
    public userId: string;
    public email: string;
    public password: string;
    public address: string;
    public telephone: string;
    public activated: boolean;

    public constructor(data: AccountData) {
        this.userId = data.userId;
        this.email = data.email;
        this.password = data.password;
        this.address = data.address;
        this.telephone = data.telephone;
        this.activated = data.activated;
    }

    public static getMockAccount() {
        return new Account({
            userId: "user-id",
            address: "Foo Street Block Baz",
            email: "mockemail@gmail.com",
            password: "Password123",
            telephone: "98372949",
            activated: false,
        });
    }
}

export interface AccountData {
    userId: string;
    email: string;
    password: string;
    address: string;
    telephone: string;
    activated: boolean;
}
