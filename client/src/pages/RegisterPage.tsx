import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { userRegistered } from "../store/slices/user";
import {
    hasDigits,
    hasLength,
    hasLowerCaseLetters,
    hasSpecialCaseLetter,
    hasUppercaseLetters,
    isPassword,
} from "../utilities/authHelper";
import { uuid } from "../../../server/src/utilities/uuid";

interface Props {
    onSubmit: (email: string, password: string) => void;
}

const Register = (props: Props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <>
        </>
    );
};

const renderPasswordCheckers = (input: string) => {
    const upperCaseLetters = (
        <h6
            className={
                hasUppercaseLetters(input, 1) ? "text-success" : "text-danger"
            }
        >
            Has at least 1 uppercase letter
        </h6>
    );

    const lowerCaseLetters = (
        <h6
            className={
                hasLowerCaseLetters(input, 3) ? "text-success" : "text-danger"
            }
        >
            Has at least 3 lowercase letters
        </h6>
    );

    const specialCaseLetters = (
        <h6
            className={
                hasSpecialCaseLetter(input, 1) ? "text-success" : "text-danger"
            }
        >
            Has at least 1 special character
        </h6>
    );

    const digits = (
        <h6 className={hasDigits(input, 1) ? "text-success" : "text-danger"}>
            Has at least 1 digit
        </h6>
    );

    const length = (
        <h6 className={hasLength(input, 8) ? "text-success" : "text-danger"}>
            Has a length of 8
        </h6>
    );

    const cases = [
        upperCaseLetters,
        lowerCaseLetters,
        specialCaseLetters,
        digits,
        length,
    ];

    return <>{cases}</>;
};

const renderGenderOptions = (onSelect: (value: string) => void) => {
    return (
        <>
        </>
    );
};

function isValidUsername(value: string) {
    return value.length > 5;
}

export default Register;
