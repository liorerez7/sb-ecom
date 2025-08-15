import { Box, CircularProgress } from "@mui/material";

const Loader =() => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                    <CircularProgress />
                </Box>
    )
}
export default Loader;