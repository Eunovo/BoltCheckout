import { controller, CRUDController, inject } from "@eunovo/superbackend";
import { ProductService } from "./ProductService";

@controller()
export class ProductController extends CRUDController {
    constructor(
        @inject(ProductService) service: ProductService
    ) {
        super('/products', service);
    }
}
