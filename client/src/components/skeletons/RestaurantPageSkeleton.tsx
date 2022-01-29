import { Container, Box, Skeleton, Grid, Stack } from "@mui/material";

const RestaurantPageSkeleton = () => {
    const detailCards = new Array(3).fill(null);
    const reviewCards = new Array(5).fill(null);

    return (
        <Container sx={{ width: "80%" }}>
            <Box mt={14} mb={9}>
                <Skeleton variant="rectangular" height={400} />
            </Box>

            <Box mb={2}>
                <Skeleton variant="text" width={120} height={50} />
            </Box>
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={{ xs: 1 }}
                justifyContent="space-between"
                mb={9}
            >
                {detailCards.map((_, index) => (
                    <Skeleton variant="rectangular" width={350} height={300} />
                ))}
            </Stack>

            <Stack spacing={2} mb={20}>
                <Skeleton variant="text" width={250} height={40} />
                <Skeleton variant="text" width={1150} height={40} />
                <Skeleton variant="text" width={1000} height={40} />
            </Stack>

            <Box mb={15}>
                <Skeleton variant="text" width={220} height={60} sx={{ mb: 4 }} />
                <Skeleton variant="rectangular" height={200} />
            </Box>

            <Box mb={4}>
                <Skeleton variant="text" width={220} height={60} sx={{ mb: 4 }} />
            </Box>
            <Stack spacing={4}>
                {reviewCards.map((_, index) => (
                    <Skeleton variant="rectangular" height={200} />
                ))}
            </Stack>
        </Container>
    );
};

export default RestaurantPageSkeleton;
