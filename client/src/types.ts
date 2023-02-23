import { Product as ProductModel } from "../../server/src/features/products/ProductModel";
import { Invoice } from "../../server/src/features/invoices/InvoiceModel";
import { StartCheckoutDto } from "../../server/src/features/checkout/StartCheckoutDto";
import { PaymentChannel as PaymentChannelEnum } from "../../server/src/features/invoices/InvoiceModel";

export type Product = ProductModel;
export type ProductFormData = Omit<Product, '_id' | 'createdAt' | 'lastUpdatedAt'>;
export type GetProductsParams = Partial<Pick<Product, '_id'>>;
export type GetInvoicesParams = Partial<Pick<Invoice, '_id' | 'currency'>>;
export type PaymentChannel = keyof typeof PaymentChannelEnum
export type PostCheckoutStartData = Omit<StartCheckoutDto, 'channel'> & { channel: PaymentChannel };
export type BuyerFormData = StartCheckoutDto['buyer'];

export interface PostProductResponse {
    message: string;
    data: string;
}

export interface GetProductsRespoonse {
    message: string;
    data: {
        results: Product[]
    }
}

export interface GetInvoicesResponse {
    message: string;
    data: {
        results: Invoice[]
    }
}

export interface PostCheckoutStartResponse {
    message: string;
    data: {
        invoiceId: string;
    }
}
