import { controller, CRUDController, inject } from "@eunovo/superbackend";
import { InvoiceService } from "./InvoiceService";

@controller()
export class InvoiceController extends CRUDController {
    constructor(
        @inject(InvoiceService) service: InvoiceService
    ) {
        super('/invoices', service);
    }
}
