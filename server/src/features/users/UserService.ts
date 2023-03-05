import { inject, Model, Observable, service, UsernamePasswordAuthService } from "@eunovo/superbackend";
import { User } from "./UserModel";
import { UserRepo } from "./UserRepo";

@service()
export class UserService extends UsernamePasswordAuthService {
    constructor(
        @inject(Observable) observable: Observable,
        @inject(UserRepo) repo: UserRepo,
        @inject(User) model: Model
    ) {
        super(observable.getObservableFor('users'), repo, model);
    }
}
