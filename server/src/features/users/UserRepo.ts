import { inject, Model, MongoRepository, repo } from "@eunovo/superbackend";
import { User } from "./UserModel";

@repo()
export class UserRepo extends MongoRepository<User> {
    constructor(@inject(User) model: Model) {
        super(model);
    }
}
