import { controller, CRUDController, inject, InputError, IRequest, get, post, requireAuth } from "@eunovo/superbackend";
import { GetCreateDto } from "../../helpers/type-utils";
import { getAuthDataFrom } from "./auth-utils";
import { User } from "./UserModel";
import { UserService } from "./UserService";

@controller()
export class UserController extends CRUDController {
    private users: UserService;

    constructor(
        @inject(UserService) service: UserService
    ) {
        super('/users', service);
        this.users = service;
    }

    @post('/signup')
    async signup(req: IRequest<GetCreateDto<User>, any, any>) {
        const data = req.body;
        if (!data) throw new InputError([
            { name: "body", message: "body is required" }
        ]);

        const userId = await this.users.create(data);

        return { message: "Created", data: { userId } };
    }

    @post('/login')
    async login(req: IRequest<Pick<User, 'email' | 'password'>, any, any>) {
        const data = req.body;
        if (!data) throw new InputError([
            { name: "body", message: "body is required" }
        ]);
        const user = await this.users.authenticate(data.email, data.password);
        return { message: "Authenitcated", data: getAuthDataFrom(user) };
    }

    @requireAuth()
    @get('/me')
    getCurrentUser(req: IRequest<any, any, any>) {
        return { message: "Authenticated", data: { currentUser: req.user } };
    }

}
