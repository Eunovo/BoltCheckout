import { FC } from 'react';
import { Box, Paper, TextField, Typography } from '@mui/material';
import { PostCheckoutStartData } from '../../types';

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
                rounded: 'md',
                p: 2
            }}>
            <Box
                component={'img'}
                src={''}
                sx={{
                    height: 250 - (250 * 1/4),
                    width: 300 - (300 * 1/4),
                    objectFit: 'cover'
                }} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    flexGrow: 1
                }}
            >
                <Typography
                    variant='h6'
                    component='div'
                    align='left'
                >Name</Typography>

                <TextField
                    label='Quantity'
                    type='number'
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1 }}
                    value={item.quantity}
                    onChange={(e) => {
                        onChange([{
                            productId: item.productId,
                            quantity: Number.parseInt(e.target.value)
                        }])
                    }}
                    size='small'
                />
            </Box>
        </Paper>
    </>
}
