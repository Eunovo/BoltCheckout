import { FC } from 'react';
import { Box, Paper, TextField, Typography } from '@mui/material';
import { PostCheckoutStartData } from '../../types';
import { ProductName } from './ProductName'; 

export const Cart: FC<{
    items: PostCheckoutStartData['items'],
    onChange: (value: PostCheckoutStartData['items']) => void
}> = ({ items, onChange }) => {
    const item = items[0];
    return <>
        <Paper variant='outlined' sx={{
                display: 'flex',
                width: '100%',
                maxWidth: 'sm',
                columnGap: 2,
                alignItems: 'stretch',
                p: 2
            }}>
            <Box
                component={'img'}
                src={`${process.env.PUBLIC_URL}/bike.png`}
                sx={{
                    height: 300 - (300 * 1/4),
                    width: 250 - (250 * 1/4),
                    objectFit: 'cover',
                    borderRadius: '5px',
                    border: '1px solid #cfcfcf',
                    p: 1
                }} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'start',
                    flexGrow: 1
                }}
            >
                <Typography
                    variant='h6'
                    component='div'
                    align='left'
                ><ProductName productId={item.productId} /></Typography>

                <TextField
                    label='Quantity'
                    type='number'
                    inputProps={{ min: 1 }}
                    value={item.quantity}
                    onChange={(e) => {
                        onChange([{
                            productId: item.productId,
                            quantity: Number.parseInt(e.target.value)
                        }])
                    }}
                    size='small'
                    sx={{ mt: 4 }}
                />
            </Box>
        </Paper>
    </>
}
