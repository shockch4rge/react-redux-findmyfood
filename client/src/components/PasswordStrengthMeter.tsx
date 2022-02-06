import { Stack, Box, Typography, SxProps, BoxProps } from "@mui/material";
import { useState, useEffect } from "react";

interface Props {
    props?: BoxProps;
    sections: {
        color: string;
        valid: boolean;
        criteria: string;
    }[];
    finalValidation: boolean;
}

const PasswordStrengthMeter = ({ sections, finalValidation, props }: Props) => {
    const [strength, setStrength] = useState(0);

    useEffect(() => {
        const possibleStrength = sections.filter(section => section.valid).length;

        if (possibleStrength !== sections.length) {
            setStrength(possibleStrength);
        }
    }, [sections]);

    return (
        <Box {...props}>
            <Stack direction="row" spacing={0.5} justifyContent="space-between" mb={1}>
                {sections.map(({ color, valid }) => (
                    <Box
                        key={`${color}-${color}`}
                        height={4}
                        width={`${100 / sections.length}%`}
                        sx={{
                            backgroundColor: theme =>
                                finalValidation ? theme.palette.primary.main : valid ? color : "#E0E0E0",
                        }}
                    />
                ))}
            </Stack>
            <Typography variant="body2" color={finalValidation ? "success" : "error"}>
                {finalValidation ? "Password is strong!" : `Password Criteria: ${sections[strength].criteria}`}
            </Typography>
        </Box>
    );
};

export default PasswordStrengthMeter;
