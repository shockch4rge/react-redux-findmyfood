import { Skeleton, Container, Grid, Box } from "@mui/material";

const HomePageSkeleton = () => {
    const gridItems = new Array(12).fill(null);

    return (
        <Container sx={{ width: "80%" }}>
            <Box mt={14} mb={4}>
                <Skeleton variant="rectangular" height={350} />
            </Box>
            <Box mb={6}>
                <Skeleton variant="text" width={100} height={50} />
                <Skeleton variant="text" width={400} height={50} />
            </Box>

            <Box mb={2}>
                <Skeleton variant="text" width={120} height={50} />
            </Box>
            <Grid container rowSpacing={4} columnSpacing={3}>
                {gridItems.map((_, index) => (
                    <Grid item key={`home_page_skeleton_${index}`} xs={4} width={380} height={300}>
                        <Skeleton variant="rectangular" height={200} />
                        <Skeleton variant="text" width={220} height={30} />
                        <Skeleton variant="text" width={160} height={30} />
                        <Skeleton variant="text" width={280} height={30} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePageSkeleton;
