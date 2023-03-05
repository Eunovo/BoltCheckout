import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { LoginFormData } from "../../types";
import { POST_LOGIN } from "../../api";

const validationSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
});

const INITIAL_DATA = {
    email: '',
    password: '',
} satisfies LoginFormData;

export const Login = () => {
    const navigate = useNavigate();

    return <>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                minWidth: '100vw'
            }}
        >
            <Paper
                sx={{
                    px: 3, py: 6,
                    width: '20rem'
                }}
                variant="outlined"
            >

                <Typography
                    variant='h3'
                >
                    Login
                </Typography>

                <Formik
                    validationSchema={validationSchema}
                    initialValues={INITIAL_DATA}
                    onSubmit={async (values) => {
                        try {
                            const data = await POST_LOGIN(values);
                            navigate('/dashboard/products')
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    {(props) => (
                        <Form>

                            <TextField
                                name='email'
                                variant='standard'
                                label='Email'
                                placeholder='dan@test.com'
                                value={props.values.email}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                helperText={props.errors.email}
                                error={!!props.errors.email}
                                sx={{ width: '100%' }}
                                margin='normal'
                            />

                            <TextField
                                name='password'
                                variant='standard'
                                label='Password'
                                type='password'
                                placeholder=''
                                value={props.values.password}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                helperText={props.errors.password}
                                error={!!props.errors.password}
                                sx={{ width: '100%' }}
                                margin='normal'
                            />

                            <Box
                                display='flex'
                                alignItems='center'
                                sx={{ mt: 4 }}
                            >
                                <Button
                                    variant='contained'
                                    disabled={props.isSubmitting}
                                    type='submit'
                                    sx={{ mr: 2 }}
                                >
                                    Log in
                                </Button>
                                <Button
                                    component={Link}
                                    to='/signup'
                                >
                                    Sign up
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    </>
}
