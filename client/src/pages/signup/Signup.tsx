import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { SignupFormData } from "../../types";
import { POST_SIGNUP } from "../../api";

const validationSchema = yup.object({
    storeName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
});

const INITIAL_DATA = {
    storeName: '',
    email: '',
    password: '',
    confirmPassword: '',
} satisfies SignupFormData;

export const Signup = () => {
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
                    Signup
                </Typography>

                <Formik
                    validationSchema={validationSchema}
                    initialValues={INITIAL_DATA}
                    onSubmit={async (values) => {
                        try {
                            await POST_SIGNUP(values);
                            navigate('/login');
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    {(props) => (
                        <Form>
                            <TextField
                                name='storeName'
                                variant='standard'
                                label='Store Name'
                                placeholder='EBikes Store'
                                value={props.values.storeName}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                helperText={props.errors.storeName}
                                error={!!props.errors.storeName}
                                sx={{ width: '100%' }}
                                margin='normal'
                            />

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

                            <TextField
                                name='confirmPassword'
                                variant='standard'
                                label='Confirm Password'
                                type='password'
                                placeholder=''
                                value={props.values.confirmPassword}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                helperText={props.errors.confirmPassword}
                                error={!!props.errors.confirmPassword}
                                sx={{ width: '100%' }}
                                margin='normal'
                            />

                            <Box
                                sx={{ mt: 4 }}
                            >
                                <Button
                                    variant='contained'
                                    disabled={props.isSubmitting}
                                    type='submit'
                                    sx={{ mr: 2 }}
                                >
                                    Sign up
                                </Button>
                                <Button
                                    component={Link}
                                    to='/login'
                                >
                                    Log in
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    </>
}
