import { controller, BaseController, inject, post, IRequest } from "@eunovo/superbackend";
import { CheckoutService } from "./CheckoutService";

@controller()
export class CheckoutController extends BaseController {
    constructor(
        @inject(CheckoutService) private checkoutService: CheckoutService
    ) {
        super('/checkout');
    }

    @post('/start')
    async start(req: IRequest<any, any, any>) {
        const invoiceId = await this.checkoutService.start(req.body);
        return { message: 'Created', data: { invoiceId } };
    }

}
