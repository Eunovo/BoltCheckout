import test from 'ava';
import { ILndClient, LndRestClient, ILndInvoiceWatcher, LndWsInvoiceWatcher } from '../src/features/lnd';

const connectionConfig = {
    host: 'https://127.0.0.1:8081',
    macaroonPath: '/home/zeddicus/.polar/networks/2/volumes/lnd/alice/data/chain/bitcoin/regtest/invoice.macaroon',
    certPath: '/home/zeddicus/.polar/networks/2/volumes/lnd/alice/tls.cert'
};

test('Can connect to Lnd node', async t => {
    const lndClient: ILndClient = new LndRestClient(connectionConfig);
    const { state } = await lndClient.getState();
    t.assert(state, 'SERVER_ACTIVE');
});

test('Can create payment hash and receive payment for payment hash', async t => {
    const lndClient: ILndClient = new LndRestClient(connectionConfig);
    const expiry = (1 * 60 * 60 * 1000);
    t.timeout(expiry);

    const response = await lndClient.addInvoice({
        memo: '',
        value_msat: '5000',
        description_hash: '',
        expiry: expiry.toString(),
        cltv_expiry: '18',
        fallback_addr: '',
        route_hints: [],
        private: false
    });

    t.assert(response.r_hash);
    t.assert(response.payment_request);

    console.log(`Settle this invoice to finish the test: ${response.payment_request}`);

    return new Promise((resolve) => {
        const invoiceWatcher: ILndInvoiceWatcher = new LndWsInvoiceWatcher(connectionConfig);
        invoiceWatcher.on("settled", (body) => {
            t.assert(body.payment_request, response.payment_request);
            resolve();
        });
    })
});
