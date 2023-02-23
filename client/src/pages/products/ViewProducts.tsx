import { Alert, Box, Button, Typography } from "@mui/material";
import { Link, useLoaderData } from "react-router-dom";
import { GetProductsRespoonse } from "../../types";
import { Header } from "../../components/Header";
import { ProductList } from "./ProductList";

export const ViewProducts = () => {
    const { data } = useLoaderData() as GetProductsRespoonse;

    return <>
        <Box
            sx={{
                backgroundColor: '#f5f5f5'
            }}
        >
            <Box
                sx={{
                    pt: 2, pb: 8, px: 4,
                    maxWidth: 'lg',
                    mx: 'auto'
                }}
            >
                <Header />

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 8,
                        mb: 6
                    }}
                >
                    <Typography variant='h2'>
                        Products
                    </Typography>

                    <Button
                        component={Link}
                        to='/dashboard/products/add'
                        sx={{ ml: 'auto' }}
                        color='primary'
                    >
                        Add Product
                    </Button>
                </Box>

                {
                    data.results.length === 0
                        ? <Alert>No products to show</Alert>
                        : <ProductList products={data.results} />
                }
            </Box>
        </Box>
    </>
}
