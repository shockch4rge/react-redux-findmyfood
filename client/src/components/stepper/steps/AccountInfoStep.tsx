import { Box, TextField } from "@mui/material";
import camelcase from "camelcase";
import { AuthHelper } from "../../../utilities/AuthHelper";

interface Props {
    handleFormChange: any;
}

const AccountInfoStep = (props: Props) => {
    const fields = ["Email", "Password", "Address", "Telephone"];
    const { handleFormChange } = props;

    return (
        <Box>
            {fields.slice(0, 1).map(field => (
                <TextField
                    autoComplete="off"
                    key={field}
                    label={field}
                    type="email"
                    name={camelcase(field)}
                    onChange={handleFormChange}
                    error={AuthHelper.isEmail()}
                />
            ))}
            {fields.slice(1, 2).map(field => (
                <TextField
                    autoComplete="off"
                    key={field}
                    label={field}
                    type="password"
                    name={camelcase(field)}
                    onChange={handleFormChange}
                />
            ))}
            {fields.slice(2).map(field => (
                <TextField
                    autoComplete="off"
                    key={field}
                    label={field}
                    type="text"
                    name={camelcase(field)}
                    onChange={handleFormChange}
                />
            ))}
        </Box>
    );
};

export default AccountInfoStep;
