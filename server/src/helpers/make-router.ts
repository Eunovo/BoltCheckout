import { BaseController, container, HttpMethods } from "@eunovo/superbackend";
import { Router } from "express";

export function makeRouter(controllers: { new(...args: any[]): BaseController }[]) {
    const router = Router();
    controllers.forEach((controllerClass) => {
        const controller = container.get<any>(controllerClass);
        use(router, controller)
    });
    return router;
}

function use(router: Router, controller: BaseController) {
    const handlers = controller.getHandlers();
    handlers.forEach((handler, route) => {
        Object.keys(handler)
            .forEach((method: string) => {
                router[method as HttpMethods](route, async (req: any, res, next) => {
                    try {
                        const reqHandler = handler[<HttpMethods>method];
                        if (!reqHandler) {
                            next();
                            return;
                        }

                        const response = await reqHandler(req);
                        res.status(200).json(response);
                    } catch (error: unknown) {
                        let message = 'Unexpected error';
                        let errors = null;
                        if (typeof error === 'object' && error != null) {
                            if ('message' in error && typeof error.message === 'string')
                                message = error.message;
                            if ('errors' in error) errors = error.errors;

                        }
                        res.status(400).json({
                            message,
                            errors
                        });
                        console.error(`${(new Date()).toUTCString()} [ERR] ${error}`);
                    }
                });
            });
    });
}
