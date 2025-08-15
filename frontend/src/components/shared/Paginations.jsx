import { Pagination, Stack } from '@mui/material';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';

const Paginations = ({ numberOfPage, totalProducts }) => {

    const [searchParams] = useSearchParams();
    const pathName = useLocation().pathname;
    const params = new URLSearchParams(searchParams.toString());
    const navigate = useNavigate();
    const paramValue = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

    const handlePageChange = (event, value) => {
        params.set("page", value.toString());
        navigate(`${pathName}?${params.toString()}`);
    };

    return (
        <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
            <Pagination
                count={numberOfPage}
                shape="rounded"
                color="primary"
                defaultPage={1}
                page={paramValue}
                siblingCount={0}
                boundaryCount={2}
                onChange={handlePageChange}
            />
        </Stack>
    );
};

export default Paginations;