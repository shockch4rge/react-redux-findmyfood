import { Box, SxProps, TextField, Theme } from "@mui/material";
import camelcase from "camelcase";

interface EnhancedInput {
    label: string;
    type: React.HTMLInputTypeAttribute;
    onChange: (name: string, value: string) => void;
    validation?: {
        case: boolean;
        statement: string;
    };
    autoComplete?: "off" | "on";
    sx?: SxProps<Theme>;
}

const EnhancedInput = (props: EnhancedInput) => {
    const { label, type, onChange, validation, sx = [], autoComplete = "off" } = props;

    return (
        <TextField
            sx={[...(Array.isArray(sx) ? sx : [sx])]}
            id={`field_${label}`}
            autoComplete={autoComplete}
            name={camelcase(label)}
            type={type}
            label={label}
            onChange={({ target }) => onChange(target.name, target.value)}
            error={validation && validation.case}
            helperText={validation && validation.statement}
        />
    );
};

export default EnhancedInput;
