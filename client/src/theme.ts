import { createTheme } from "@mui/material";

let theme = createTheme({
    typography: {
        fontFamily: ["GalyonBold", "GalyonBook"].join(","),
    },

    palette: {
        primary: {
            light: "#8bf84c",
            main: "#30d64a",
        },
    },

    
});

theme = createTheme(theme, {
    components: {
        MuiAppBar: {
            variants: [
                {
                    props: {},
                    style: {
                        backgroundColor: theme.palette.common.white,
                        borderBottom: "medium solid",
                        borderImageSlice: 1,
                        borderImageSource: "var(--gradient)",
                    },
                },
            ],
        },
    },
});

export default theme
