export default class Account implements AccountData {
    public userId: string;
    public password: string;
    public email: string;
    public telephone: string;
    public address: string;
    public activated: boolean;

    public constructor(data: AccountData) {
        this.userId = data.userId;
        this.password = data.password;
        this.email = data.email;
        this.telephone = data.telephone;
        this.address = data.address;
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
    password: string;
    email: string;
    telephone: string;
    address: string;
    activated: boolean;
}
