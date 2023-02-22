import { Alert, Box, Button, Typography } from "@mui/material";
import { Link, useLoaderData } from "react-router-dom";
import { GetProductsRespoonse } from "../../types";
import { ProductList } from "./ProductList";

export const ViewProducts = () => {
    const { data } = useLoaderData() as GetProductsRespoonse;

    return <>
        <Box
            sx={{
                py: 8, px: 4,
                backgroundColor: '#f5f5f5'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
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
    </>
}
