import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


export const Header = () => {
    return <>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Typography variant='h6'>BoltCheckout</Typography>

            <Button component={Link} to='/dashboard/products' sx={{ ml: 'auto' }}>
                Products
            </Button>

            <Button component={Link} to='/dashboard/invoices' sx={{ ml: 2 }}>
                Invoices
            </Button>
        </Box>
    </>
}
