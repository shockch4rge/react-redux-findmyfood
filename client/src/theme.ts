import { createTheme } from "@mui/material";
import GalyonBold from "./assets/fonts/Galyon-Bold.otf";
import GalyonBook from "./assets/fonts/Galyon-Book.otf";
import GalyonBoldItalic from "./assets/fonts/Galyon-Bold-Italic.otf";
import GalyonBookItalic from "./assets/fonts/Galyon-Book-Italic.otf";

let theme = createTheme({
    typography: {
        fontFamily: "GalyonBold",

        body2: {
            fontFamily: "GalyonBook",
        },

        subtitle1: {
            fontFamily: "GalyonBoldItalic",
        },

        subtitle2: {
            fontFamily: "GalyonBookItalic",
        },
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

        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: GalyonBold;
                    src: url(${GalyonBold});
                }

                @font-face {
                    font-family: GalyonBook;
                    src: url(${GalyonBook});
                }

                @font-face {
                    font-family: GalyonBoldItalic;
                    src: url(${GalyonBoldItalic});
                }

                @font-face {
                    font-family: GalyonBookItalic;
                    src: url(${GalyonBookItalic});
                }
            `,
        },
    },
});

export default theme;
