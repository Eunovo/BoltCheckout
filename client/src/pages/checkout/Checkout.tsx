import { Box, Button, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useLoaderData, useNavigate } from "react-router-dom";
import { BuyerFormData, GetProductsRespoonse } from "../../types";
import { POST_CHECKOUT_START } from "../../api";
import { BuyerForm } from "./BuyerForm";

const validationSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email()
});

const INITIAL_VALUES: BuyerFormData = {
    firstName: '',
    lastName: '',
    email: ''
}

export const Checkout = () => {
    const { data } = useLoaderData() as GetProductsRespoonse;
    const navigate = useNavigate();
    const product = data.results[0]!;

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

            <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    const response = await POST_CHECKOUT_START({
                        buyer: values,
                        items: [{ productId: product._id!, quantity: 1 }],
                        currency: 'millisat',
                        channel: "ligthning"
                    });

                    navigate(`/pay/${response.data.invoiceId}`);
                }}
            >
                <Box component={Form} sx={{ width: '100%', maxWidth: 'sm' }}>                    
                    <BuyerForm />

                    <Button sx={{ mt: 6, width: '80%' }} type='submit' variant='contained'>Save</Button>
                </Box>
            </Formik>

        </Box>
    </>;
}
