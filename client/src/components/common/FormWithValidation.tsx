import { Box, TextField } from "@mui/material";

interface FormWithValidationProps {
    label: string;
    type: React.HTMLInputTypeAttribute;
    onChange: (value: string) => void;
    validation?: {
        case: boolean;
        statement: string;
    };
}

const FormWithValidation = (props: FormWithValidationProps) => {
    const { label, type, onChange, validation } = props;

    return (
        <>
            <Box>
                <TextField
                    id={`field_${label}`}
                    type={type}
                    label={label}
                    error={validation ? validation.case : false}
                    onChange={e => onChange(e.target.value)}
                    helperText={validation && validation.statement}
                />
            </Box>
        </>
    );

    return (
        <>
            <Box component="form">
                <TextField
                    error={true}
                    id="outlined-error"
                    label="error"
                    defaultValue="Hello World"
                />
            </Box>
        </>
    );
};

export default FormWithValidation;
