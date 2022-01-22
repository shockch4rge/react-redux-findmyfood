import React, { useState } from "react";
import { Box, Step, StepLabel, Stepper, styled, SxProps, Theme } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PersonIcon from "@mui/icons-material/Person";
import { StepIconProps } from "@mui/material/StepIcon";

export const CustomStepLineConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: "var(--gradient)",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage: "var(--gradient)",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderRadius: 1,
    },
}));

export const CustomStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
        backgroundImage: "var(--gradient)",
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    }),
    ...(ownerState.completed && {
        backgroundImage: "var(--gradient)",
    }),
}));

export const CustomStepIcon = (props: StepIconProps) => {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <PersonIcon />,
        2: <VerifiedUserIcon />,
        3: <DoneIcon />,
    };

    return (
        <CustomStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </CustomStepIconRoot>
    );
};

interface CustomStepperProps {
    steps: string[];
    activeStep: number;
    sx?: SxProps<Theme>;
}

const CustomStepper = (props: CustomStepperProps) => {
    const { steps, activeStep, sx = [] } = props;

    return (
        <Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
            <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<CustomStepLineConnector />}
            >
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default CustomStepper;
