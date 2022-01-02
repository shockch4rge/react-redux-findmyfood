export function isEmail(email: string) {
    const regex = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    return regex.test(email);
}

/**
 * Ensure string has:
 * 1. two uppercase letters
 * 2. one special case letter
 * 3. two digits
 * 4. three lowercase letters
 * 5. length of eight
 * @param password The input
 * @returns A check success/failure
 */
export function isPassword(...cases: boolean[]) {
    return cases.every(_case => _case);
}

export function hasUppercaseLetters(password: string, quantity: number = 2) {
    const regex = new RegExp(`((.*[A-Z]){${quantity}})`);
    return regex.test(password);
}

export function hasSpecialCaseLetter(password: string, quantity: number = 1) {
    const regex = new RegExp(`((.*[!@#$&*]){${quantity}})`);
    return regex.test(password);
}

export function hasDigits(password: string, quantity: number = 2) {
    const regex = new RegExp(`((.*[0-9])${quantity})`);
    return regex.test(password);
}

export function hasLowerCaseLetters(password: string, quantity: number = 3) {
    const regex = new RegExp(`((.*[a-z])${quantity})`);
    return regex.test(password);
}

export function hasLength(password: string, length: number = 8) {
    const regex = new RegExp(`.{${length}}`);
    return regex.test(password);
}
