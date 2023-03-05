import { RequestHandler } from "express";
import { container } from "@eunovo/superbackend";
import { UserService } from "../features/users/UserService";
import { getUserFrom } from "../features/users/auth-utils";

const users = container.get(UserService);

export const auth: RequestHandler = async (req, _res, next) => {
    const authorization = req.headers.authorization;
    const tokens = authorization?.split(" ");

    if (tokens?.[0]?.toLowerCase() !== 'bearer') {
        next()
        return;
    }

    const { _id } = getUserFrom({ token: tokens[1] });
    (req as any).user = await users.findOne({ _id });
    next();
}
