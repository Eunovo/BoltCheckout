import { useRef } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import { FormikErrors, useFormikContext } from "formik";
import { ProductFormData } from "../../types";

export const ProductForm = () => {
    const { errors, values, setFieldValue, handleChange, handleBlur } = useFormikContext<ProductFormData>();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    return <>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 'lg'
            }}
        >

            <input ref={fileInputRef} type="file" hidden />

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Button
                    onClick={() => {
                        if (fileInputRef.current === null) return;
                        fileInputRef.current.click();
                    }}
                    sx={{
                        borderRadius: 2,
                        width: 300,
                        height: 250,
                        backgroundColor: '#efefef',
                        mb: 4,
                        mr: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <AddAPhoto fontSize='large' htmlColor='black' />
                </Button>

                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <TextField
                        placeholder="Product name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.name}
                        error={Boolean(errors.name)}
                        sx={{ mb: 4 }}
                    />

                    <TextField
                        placeholder="Product price"
                        value={values.prices[0]?.value ?? 0}
                        onChange={(e) => {
                            const parsed = Number.parseInt(e.target.value);
                            if (e.target.value && isNaN(parsed)) return;

                            const price = values.prices[0] ?? { currency: 'millisat' };
                            setFieldValue('prices', [{
                                ...price,
                                value: parsed || 0
                            }]);
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">mSat</InputAdornment>
                        }}
                        helperText={toErrorString(errors.prices?.[0])}
                        error={Boolean(errors.prices?.[0])}
                    />
                </Box>
            </Box>

            <TextField
                placeholder="Product description"
                rows={6}
                multiline
                sx={{ mb: 4 }}
            />

        </Box>
    </>
}

function toErrorString(error: undefined | string | FormikErrors<{ value: number, currency: 'millisat' }>): string | undefined {
    if (error === undefined || typeof error === 'string') return error;
    if (Array.isArray(error)) return error.join(',');
    return error.value;
}
