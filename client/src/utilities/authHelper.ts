export class AuthHelper {
    public static isEmail(email: string) {
        const regex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        return regex.test(email);
    }

    public static isPassword(password: string) {
        const cases: boolean[] = [
            this.hasDigits(password),
            this.hasUpperCaseLetters(password),
            this.hasLength(password),
            this.hasSpecialCharacters(password),
        ];

        return cases.every(_case => _case);
    }

    public static hasUpperCaseLetters(password: string, quantity: number = 2) {
        const regex = new RegExp(`((.*[A-Z]){${quantity}})`);
        return regex.test(password);
    }

    public static hasSpecialCharacters(password: string, quantity: number = 1) {
        const regex = new RegExp(`((.*[!@#$&*]){${quantity}})`);
        return regex.test(password);
    }

    public static hasDigits(password: string, quantity: number = 2) {
        const regex = new RegExp(`((.*[0-9]){${quantity}})`);
        return regex.test(password);
    }

    public static hasLowerCaseLetters(password: string, quantity: number = 3) {
        const regex = new RegExp(`((.*[a-z]){${quantity}})`);
        return regex.test(password);
    }

    public static hasLength(password: string, length: number = 8) {
        const regex = new RegExp(`.{${length}}`);
        return regex.test(password);
    }
}
