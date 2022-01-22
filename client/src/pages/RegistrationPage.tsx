import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container } from "@mui/material";
import CustomStepper from "../components/stepper/CustomStepper";
import { UserData } from "../models/User";
import AccountInfoStep from "../components/stepper/steps/AccountInfoStep";
import FinishedStep from "../components/stepper/steps/FinishedStep";
import PublicProfileStep from "../components/stepper/steps/ProfileProfileStep";
import { Nullable } from "../utilities/Nullable";

const RegistrationPage = () => {
    const [stepNumber, setStepNumber] = useState(0);
    const [credentials, setCredentials] = useState<Nullable<Omit<UserData, "id">>>({
        username: null,
        activated: false,
        address: null,
        avatarPath: null,
        email: null,
        gender: null,
        firstName: null,
        lastName: null,
        password: null,
        telephone: null,
    });

    const handleFormChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const steps = ["Public Profile", "Account Info", "Finish!"];

    return (
        <>
            <Container maxWidth="md">
                <CustomStepper sx={{ mt: 20 }} steps={steps} activeStep={stepNumber} />

                <Box sx={{ height: 400, mt: 10 }}>
                    {stepNumber === 0 && <PublicProfileStep handleFormChange={handleFormChange} />}
                    {stepNumber === 1 && <AccountInfoStep handleFormChange={handleFormChange} />}
                    {stepNumber === 2 && <FinishedStep userCredentials={credentials} />}
                </Box>

                <Box
                    sx={{
                        mt: 5,
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button
                        onClick={() => setStepNumber(prev => prev - 1)}
                        disabled={stepNumber < 1}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() => setStepNumber(prev => prev + 1)}
                        disabled={stepNumber > 1}
                    >
                        Next
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default RegistrationPage;
