export interface GetStateResponse {
    state: 'NON_EXISTING' | 'LOCKED' | 'UNLOCKED' | 'RPC_ACTIVE' | 'SERVER_ACTIVE' | 'WAITING_TO_START';
}

export type AddInvoiceBody = {
    memo: string;

    /**
     * Preimage encoded as base64
     * If the preimage hash is not specified, the lnd
     * will generate the preimage and return the hash
     */
    r_preimage?: string;

    /**
     * Hash encoded as base64
     */
    r_hash?: string;

    description_hash: string;
    expiry: string;
    fallback_addr: string;
    cltv_expiry: string;
    route_hints: Array<{ hop_hints: HopHint[] }>;
    private: boolean
} & (
        { value: string; } | { value_msat: string; }
    )

export interface HopHint {
    node_id: string;
    chain_id: string;
    fee_base_msat: number;
    fee_proportional_millionts: number;
    cltv_expiry_delta: number
}

export interface AddInvoiceResponse {
    r_hash: string;
    payment_request: string;
    add_index: string;
    payment_addr: string;
}

export interface ILndInvoice {
    memo: string;
    r_preimage: string;
    r_hash: string;
    value: string;
    value_msat: string;
    settled: boolean;
    creation_date: string;
    settle_date: string;
    payment_request: string;
    description_hash: string;
    expiry: string;
    fallback_addr: string;
    cltv_expiry: string;
    route_hints: { hop_hints: HopHint[] }[]; // or RouteHint[] if defined
    private: boolean;
    add_index: string;
    settle_index: string;
    amt_paid: string;
    amt_paid_sat: string;
    amt_paid_msat: string;
    state: 'OPEN' | 'SETTLED' | 'CANCELED' | 'ACCEPTED';
    htlcs: unknown[]; // or Htlc[] if defined
    features: { [key: string]: unknown }; // or Features if defined
    is_keysend: boolean;
    payment_addr: string;
    is_amp: boolean;
    amp_invoice_state: unknown; // or AmpInvoiceState if defined
}

