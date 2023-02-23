import { Box, TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { BuyerFormData } from "../../types";

export const BuyerForm = () => {
    const { errors, values, handleChange, handleBlur } = useFormikContext<BuyerFormData>();

    return <>
        <Typography sx={{ mb: 4 }}>Enter your contact and delivery information</Typography>

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
                sx={{ mb: 4 }}
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
                sx={{ mb: 4 }}
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
                sx={{ mb: 4 }}
            />
        </Box>

    </>
}
