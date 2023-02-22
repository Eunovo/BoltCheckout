import { FC } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Product } from "../../types";

interface ProductListProps {
    products: Product[];
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return <>
        <Box>
            <Paper variant='outlined' sx={{ p: 2, mb: 4 }}>
                <Typography
                    variant='h6'
                    component='div'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        textAlign: 'left',
                        columnGap: 2,
                        width: '100%'
                    }}
                >
                    <Box width='40%'>Product Name</Box>
                    <Box width='20%'>Price(mSat)</Box>
                </Typography>
            </Paper>

            {
                products.map((product, index) => (
                    <Paper key={index} variant='outlined' sx={{ p: 2, mb: 2 }}>
                        <Typography
                            component='div'
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                textAlign: 'left',
                                columnGap: 2,
                                width: '100%'
                            }}
                        >
                            <Box width='40%'>{product.name}</Box>
                            <Box width='20%'>{formatter.format(product.prices[0].value)}</Box>
                        </Typography>
                    </Paper>
                ))
            }
        </Box>
    </>
}
