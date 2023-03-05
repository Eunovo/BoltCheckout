import {
    GetProductsParams,
    GetProductsRespoonse,
    ProductFormData,
    PostProductResponse,
    GetInvoicesParams,
    GetInvoicesResponse,
    PostCheckoutStartData,
    PostCheckoutStartResponse,
    SignupFormData,
    PostLoginResponse,
    LoginFormData
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
    return resData as GetProductsRespoonse;
}

export async function GET_INVOICES(params: GetInvoicesParams) {
    const searchParams = new URLSearchParams(params);
    const response = await fetch(
        BASE_URL + `/invoices?${searchParams.toString()}`,
        { method: 'GET' }
    );
    const resData = await response.json();
    return resData as GetInvoicesResponse;
}

export async function POST_CHECKOUT_START(data: PostCheckoutStartData) {
    const response = await fetch(BASE_URL + '/checkout/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData as PostCheckoutStartResponse;
}

export async function POST_SIGNUP(data: SignupFormData) {
    await fetch(BASE_URL + '/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}

export async function POST_LOGIN(data: LoginFormData) {
    const response = await fetch(BASE_URL + '/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const resData = await response.json();
    return resData as PostLoginResponse;
}
