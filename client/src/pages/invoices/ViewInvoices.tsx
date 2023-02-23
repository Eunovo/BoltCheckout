import { Box, Typography, Alert } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { Header } from "../../components/Header";
import { GetInvoicesResponse } from "../../types";
import { InvoicesTable } from "./InvoicesTables";

export const ViewInvoices = () => {
    const { data } = useLoaderData() as GetInvoicesResponse;

    return <>
        <Box
            sx={{
                backgroundColor: '#f5f5f5',
                minHeight: '100vh'
            }}
        >
            <Box
                sx={{
                    pt: 2, pb: 8, px: 4,
                    maxWidth: 'lg',
                    mx: 'auto'
                }}
            >
                <Header />

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 8,
                        mb: 6
                    }}
                >
                    <Typography variant='h2'>
                        Invoices
                    </Typography>
                </Box>

                {
                    data.results.length === 0
                        ? <Alert variant='filled' color='info'>No Invoices to show</Alert>
                        : <InvoicesTable rows={data.results} />
                }
            </Box>
        </Box>
    </>
}
