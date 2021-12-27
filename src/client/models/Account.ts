export default class Account implements AccountData {
    public userId: string;
    public email: string;
    public password: string;
    public telephone: string;
    public address: string;

    public constructor(data: AccountData) {
        this.userId = data.userId;
        this.email = data.email;
        this.password = data.password;
        this.telephone = data.telephone;
        this.address = data.address;
    }
}

export interface AccountData {
    userId: string;
    email: string;
    password: string;
    telephone: string;
    address: string;
}
