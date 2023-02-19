import { service, CRUDService, inject, Observable } from "@eunovo/superbackend";
import { Product } from "./ProductModel";
import { ProductRepo } from "./ProductRepo";

@service()
export class ProductService extends CRUDService<Product> {
    constructor(
        @inject(Observable) observable: Observable,
        @inject(ProductRepo) repo: ProductRepo
    ) {
        super(observable.getObservableFor('product'), repo);
    }
}
