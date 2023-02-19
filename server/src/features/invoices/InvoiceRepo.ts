import { repo, Model, MongoRepository, inject } from "@eunovo/superbackend";
import { Invoice } from "./InvoiceModel";

@repo()
export class InvoiceRepo extends MongoRepository<Invoice> {
    constructor(@inject(Invoice) model: Model) {
        super(model);
    }
}
