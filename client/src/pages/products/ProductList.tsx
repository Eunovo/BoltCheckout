import { FC } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Product } from "../../types";
import { useCopyToClipboard } from "../../hooks";
import { useSnackbar } from "notistack";
import { CopyAllOutlined } from "@mui/icons-material";

interface ProductListProps {
    products: Product[];
}

export const ProductList: FC<ProductListProps> = ({ products }) => {
    const { copyToClipboard } = useCopyToClipboard();
    const { enqueueSnackbar } = useSnackbar();

    const formatter = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0
    });

    return <>
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            columnGap: 2,
            rowGap: 2
        }}>
            {
                products.map((product, index) => (
                    <Paper key={index} variant='outlined'
                        sx={{ display: 'flex', columnGap: 2, p: 2 }}>
                        <Box
                            component={'img'}
                            src={`${process.env.PUBLIC_URL}/bike.png`}
                            sx={{
                                height: 300 - (300 * 1 / 4),
                                width: 250 - (250 * 1 / 4),
                                objectFit: 'cover',
                                borderRadius: '5px',
                                border: '1px solid #cfcfcf',
                                p: 1
                            }} />

                        <Box display='flex' flexDirection='column'>
                            <Box component={Typography} variant='h6'>
                                {product.name}
                            </Box>

                            <Box mt={2}>{formatter.format(product.prices[0].value)} mSat</Box>
                            
                            <Box mt='auto'>
                                <Button
                                    onClick={() => {
                                        copyToClipboard(
                                            `http://localhost:3000/buy/${product._id}`,
                                            () => enqueueSnackbar('Copied'),
                                            () => enqueueSnackbar('Failed to Copy')
                                        )
                                    }}
                                    sx={{ ml: 'auto' }}
                                    variant='outlined'
                                    size='small'
                                    startIcon={<CopyAllOutlined />}
                                >Buy Link</Button>
                            </Box>
                        </Box>
                    </Paper>
                ))
            }
        </Box>
    </>
}
