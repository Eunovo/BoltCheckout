import { Box, TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { BuyerFormData } from "../../types";

export const BuyerForm = () => {
    const { errors, values, handleChange, handleBlur } = useFormikContext<BuyerFormData>();

    return <>
        <Typography variant="h6" margin='normal'>
            Enter your contact and delivery information
        </Typography>

        <Box
            display='flex'
            flexDirection='column'
        >
            <TextField
                label='Firstname'
                placeholder="Firstname"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.firstName}
                error={Boolean(errors.firstName)}
                margin='normal'
            />

            <TextField
                label='Lastname'
                placeholder="Lastname"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.lastName}
                error={Boolean(errors.lastName)}
                margin='normal'
            />

            <TextField
                label='Email'
                placeholder="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.email}
                error={Boolean(errors.email)}
                margin='normal'
            />
        </Box>

    </>
}
