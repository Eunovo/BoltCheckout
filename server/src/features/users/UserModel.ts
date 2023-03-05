import { accessControl, createdAt, field, lastUpdatedAt, model, password, username } from "@eunovo/superbackend"

@accessControl('user')
@model('User')
export class User {

    _id?: string;

    @username()
    @field('email', 'String')
    email!: string;

    @password()
    @field('password', 'String')
    password!: string;

    @field('storeName', 'String')
    storeName!: string;

    @createdAt()
    @field('createdAt', 'Date')
    createdAt!: Date;

    @lastUpdatedAt()
    @field('lastUpdatedAt', 'Date')
    lastUpdatedAt!: Date;
}
