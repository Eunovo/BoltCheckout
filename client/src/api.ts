import {
    GetProductsParams,
    GetProductsRespoonse,
    ProductFormData,
    PostProductResponse,
    GetInvoicesParams,
    GetInvoicesResponse,
    PostCheckoutStartData,
    PostCheckoutStartResponse
} from "./types";

const BASE_URL = process.env.REACT_APP_API_URL;

export async function POST_PRODUCT(data: ProductFormData) {
    const response = await fetch(BASE_URL + '/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData satisfies PostProductResponse;
}

export async function GET_PRODUCTS(params: GetProductsParams) {
    const searchParams = new URLSearchParams(params);
    const response = await fetch(
        BASE_URL + `/products?${searchParams.toString()}`,
        { method: 'GET' }
    );
    const resData = await response.json();
    return resData satisfies GetProductsRespoonse;
}

export async function GET_INVOICES(params: GetInvoicesParams) {
    const searchParams = new URLSearchParams(params);
    const response = await fetch(
        BASE_URL + `/invoices?${searchParams.toString()}`,
        { method: 'GET' }
    );
    const resData = await response.json();
    return resData satisfies GetInvoicesResponse;
}

export async function POST_CHECKOUT_START(data: PostCheckoutStartData) {
    const response = await fetch(BASE_URL + '/s', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData satisfies PostCheckoutStartResponse;
}
