import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Form,
    FormFeedback,
    FormGroup,
    FormText,
    Input,
    Label,
} from "reactstrap";
import { UserData } from "../models/User";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { userRegistered } from "../store/slices/user";
import { uuid } from "../utilities/uuid";

interface Props {
    onSubmit: (email: string, password: string) => void;
}

const Register = (props: Props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [username, setUserName] = useState("");
    const dispatch = useAppDispatch();
    const navigateTo = useNavigate();

    return (
        <>
            <Form inline>
                <FormGroup floating inline>
                    <Input
                        onChange={e => setFirstName(e.target.value)}
                        autoFocus
                        id="firstNameInput"
                        name="firstName"
                        placeholder="First Name"
                        type="text"
                    />
                    <Label for="firstNameInput">First Name</Label>
                </FormGroup>

                <FormGroup floating inline>
                    <Input
                        onChange={e => setLastName(e.target.value)}
                        id="lastNameInput"
                        name="lastName"
                        placeholder="Last Name"
                        type="text"
                    />
                    <Label for="lastNameInput">Last Name</Label>
                </FormGroup>

                <FormGroup floating inline>
                    <Input
                        onChange={e => setUserName(e.target.value)}
                        id="usernameInput"
                        name="username"
                        placeholder="Username (Optional)"
                        type="text"
                        valid={isValidUsername(username)}
                        invalid={!isValidUsername(username)}
                    />
                    <FormFeedback valid>Your username is correct!</FormFeedback>
                    <FormFeedback>Wrong username...</FormFeedback>
                    <Label for="usernameInput">Username (Optional)</Label>
                </FormGroup>

                {renderGenderOptions(option => {
                    setGender(option);
                })}

                <Button
                    onClick={e => {
                        e.preventDefault();
                        dispatch(
                            userRegistered({
                                id: uuid(),
                                firstName,
                                lastName,
                                gender,
                                username,
                            })
                        );

                        navigateTo("/page-not-found");
                    }}
                >
                    Register
                </Button>
            </Form>
        </>
    );
};

function renderGenderOptions(onSelect: (value: string) => void) {
    // WRONG!!!
    return (
        <>
            <Label for="genderInput">GENDER</Label>
            <FormGroup id="genderInput" tag="fieldset">
                <FormGroup inline check>
                    <Label check>Male</Label>
                    <Input
                        onChange={e => onSelect(e.target.value)}
                        name="radio1"
                        value="Male"
                        type="radio"
                    />
                </FormGroup>

                <FormGroup inline check>
                    <Label check>Female</Label>
                    <Input
                        onChange={e => onSelect(e.target.value)}
                        name="radio1"
                        value="Female"
                        type="radio"
                    />
                </FormGroup>

                <FormGroup inline check>
                    <Label check>Other</Label>
                    <Input
                        onChange={e => onSelect(e.target.value)}
                        name="radio1"
                        value="Other"
                        type="radio"
                    />
                </FormGroup>
            </FormGroup>
        </>
    );
}

function isValidUsername(value: string) {
    return value.length > 5;
}

export default Register;
