import { repo, Model, MongoRepository, inject } from "@eunovo/superbackend";
import { FilterQuery } from "mongoose";
import { Currency } from "../../core/Currency";
import { Invoice } from "./InvoiceModel";

@repo()
export class InvoiceRepo extends MongoRepository<Invoice> {
    constructor(@inject(Invoice) model: Model) {
        super(model);
    }

    aggregateTotalPaymentFor(filter: FilterQuery<Invoice>) {
        return this.mongooseModel.aggregate<{ _id: Currency, totalValue: number }>([
            { $match: filter },
            { $group: { _id: "$currency", totalValue: { $sum: "$payments.value" } } }
        ]);
    }

}
