import { controller, CRUDController, get, inject } from "@eunovo/superbackend";
import { InvoiceService } from "./InvoiceService";

@controller()
export class InvoiceController extends CRUDController {
    private invoices: InvoiceService;

    constructor(
        @inject(InvoiceService) service: InvoiceService
    ) {
        super('/invoices', service);
        this.invoices = service;
    }

    @get('/total-sales')
    async getTotalSales() {
        const totals = await this.invoices.getTotalSalesByCurrencies();
        return { message: 'Balances', data: totals };
    }

}
