import { inject, Model, MongoRepository, repo } from "@eunovo/superbackend";
import { Product } from "./ProductModel";

@repo()
export class ProductRepo extends MongoRepository<Product> {
    constructor(@inject(Product) model: Model) {
        super(model);
    }
}