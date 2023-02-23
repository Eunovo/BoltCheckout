import { CheckCircleOutlined, CopyAll } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { useSnackbar } from "notistack";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { useCopyToClipboard } from "../../hooks";
import { GetInvoicesResponse } from "../../types";
import { useEffect } from "react";
import { GET_INVOICES } from "../../api";

export const PayInvoice = () => {
    const { data } = useLoaderData() as GetInvoicesResponse;
    const { isCopying, copyToClipboard } = useCopyToClipboard();
    const { enqueueSnackbar } = useSnackbar();
    const [invoice, setInvoice] = useState(data.results[0]!);

    useEffect(() => {
        // Poll the server to get updates to invoice

        let isLoading = false;
        const interval = setInterval(async () => {
            if (isLoading) return; // Already loading, check on next run
            try {
                isLoading = true;
                const result = await GET_INVOICES({ _id: invoice._id });
                if (!result.data.results[0]) return;
                setInvoice(result.data.results[0]);
            } catch (err) {
                console.error(err);
            } finally {
                isLoading = false;
            }
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [invoice, setInvoice]);

    if (invoice.status.status === 'PAYMENT_CREATED')
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

                <Typography sx={{ mb: 2 }} variant='h6'>Scan the QR code below</Typography>

                <QRCodeSVG value={invoice.payments[0]!.paymentRequest!} />

                <Typography sx={{ mt: 4 }}>Or click the button below to copy your payment request</Typography>
                <Button
                    onClick={() => {
                        copyToClipboard(
                            invoice.payments[0]!.paymentRequest!,
                            () => enqueueSnackbar('Copied'),
                            () => enqueueSnackbar('Failed to copy')
                        )
                    }}
                    sx={{ maxWidth: 'sm' }}
                    variant='outlined'
                    endIcon={isCopying ? <CircularProgress /> : <CopyAll />}
                >
                    <Typography noWrap>{invoice.payments[0]?.paymentRequest}</Typography>
                </Button>

            </Box>
        </>

    if (invoice.status.status === 'FULFILLED')
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

                <Typography sx={{ mb: 2 }} variant='h6'>
                    Payment Completed
                </Typography>

                <CheckCircleOutlined color='success' sx={{ fontSize: 80 }} />

            </Box>
        </>

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

            <Typography sx={{ mb: 2 }} variant='h6'>
                Invalid Invoice
            </Typography>

        </Box>
    </>;
}
