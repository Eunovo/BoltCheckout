import express from "express";
import cors from "cors";
import '../src/config';
import { CheckoutController } from "./features/checkout/CheckoutController";
import { InvoiceController } from "./features/invoices/InvoiceController";
import { LndRestClient } from "./features/lnd";
import { ProductController } from "./features/products/ProductController";
import { makeRouter } from "./helpers/make-router";
import { UserController } from "./features/users/UserController";
import { auth } from "./middleware/auth-middleware";

const app = express();
app.use(cors());
app.use(express.json());
const router = makeRouter([
    ProductController,
    CheckoutController,
    InvoiceController,
    UserController
]);
app.use(auth)
app.use(router);

app.get('/', async (_req, res) => {
    const app_state = { lnd: 'UNREACHABLE' };
    try {
        const lnd = new LndRestClient({
            host: process.env.LND_HOST!,
            macaroonPath: process.env.LND_MACAROON_PATH!,
            certPath: process.env.LND_CERT_PATH!
        });
        const lndState = await lnd.getState();
        app_state.lnd = lndState.state;
    } catch (error) {
        console.log('ERROR', error);    
    }
    res.json({ message: 'OK', data: app_state });
});

const APP_PORT = process.env.APP_PORT || 2020;

app.listen(APP_PORT, () => {
    console.log("Server Started on port", APP_PORT);
});
