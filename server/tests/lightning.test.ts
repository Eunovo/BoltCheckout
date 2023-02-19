import test from 'ava';
import { ILightningClient, LndRestClient } from '../src/features/lightning';

test('Can connect to lightning node', async t => {
    const lndClient: ILightningClient = new LndRestClient({
        host: 'https://127.0.0.1:8081',
        readonlyMacaroonPath: '/home/zeddicus/.polar/networks/2/volumes/lnd/alice/data/chain/bitcoin/regtest/readonly.macaroon',
        certPath: '/home/zeddicus/.polar/networks/2/volumes/lnd/alice/tls.cert'
    });
    const { state } = await lndClient.getState();
    t.assert(state, 'SERVER_ACTIVE');
});

test.todo('Can create payment hash and receive payment for payment hash');
