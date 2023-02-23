import { Box, Button, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BuyerFormData, GetProductsRespoonse } from "../../types";
import { POST_CHECKOUT_START } from "../../api";
import { BuyerForm } from "./BuyerForm";
import { Cart } from "./Cart";

const validationSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email(),
    deliveryAddress: yup.string().required()
});

const INITIAL_VALUES: BuyerFormData = {
    firstName: '',
    lastName: '',
    email: '',
    deliveryAddress: ''
}

export const Checkout = () => {
    const { data } = useLoaderData() as GetProductsRespoonse;
    const navigate = useNavigate();
    const product = data.results[0]!;
    const [items, setItems] = useState([{ productId: product._id!, quantity: 1 }]);

    const formatter = new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0
    });

    return <>
        <Box
            sx={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh'
            }}
        >

            <Typography variant='h4' sx={{ mb: 6 }}>
                BoltCheckout
            </Typography>

            <Typography sx={{ mb: 4 }}>
                You are about to pay <Typography sx={{ fontWeight: 'bold' }} component='span'>
                    {formatter.format(product.prices[0].value * items[0].quantity)} mSat
                </Typography> for
            </Typography>

            <Cart items={items} onChange={setItems} />

            <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    const response = await POST_CHECKOUT_START({
                        buyer: values,
                        items,
                        currency: 'millisat',
                        channel: "ligthning"
                    });

                    navigate(`/pay/${response.data.invoiceId}`);
                }}
            >
                <Box component={Form} sx={{ width: '100%', maxWidth: 'sm' , mt: 6}}>                    
                    <BuyerForm />

                    <Button sx={{ mt: 6, width: '60%' }} type='submit' variant='contained'>
                        Continue
                    </Button>
                </Box>
            </Formik>

        </Box>
    </>;
}
