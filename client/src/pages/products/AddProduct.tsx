import { Box, Button, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { ProductForm } from "./ProductForm";
import { ProductFormData } from "../../types";
import { POST_PRODUCT } from "../../api";

const validationSchema = yup.object({
    name: yup.string().required(),
    prices: yup.array(
        yup.object({
            value: yup.number(),
            currency: yup.string()
        })
    )
});

const INITIAL_VALUES: ProductFormData = {
    name: '',
    prices: [{ value: 0, currency: 'millisat' }]
}

export const AddProduct = () => {
    return <>
        <Box
            sx={{
                py: 8, px: 4
            }}
        >
            <Typography variant='h2' sx={{ mb: 6 }}>
                Add Product
            </Typography>

            <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={validationSchema}
                onSubmit={(values) => POST_PRODUCT(values)}
            >
                <Form>
                    <ProductForm />

                    <Box sx={{ mt: 6 }}>
                        <Button type='submit' variant='contained'>Save</Button>
                    </Box>
                </Form>
            </Formik>
        </Box>
    </>;
}
