import test from 'ava';
import express from 'express';
import request from 'supertest';
import '../src/config';
import { UserController } from '../src/features/users/UserController';
import { User } from '../src/features/users/UserModel';
import { makeRouter } from '../src/helpers/make-router';
import { GetCreateDto } from '../src/helpers/type-utils';
import { auth } from '../src/middleware/auth-middleware';

const app = express();
const router = makeRouter([
    UserController
]);
app.use(express.json());
app.use(auth);
app.use(router);

const user: GetCreateDto<User> = {
    email: `${Date.now().toString()}@test.com`,
    password: 'password',
    storeName: 'Test'
};
let token: string;

test.serial('Can register user', async (t) => {
    const { body } = await request(app)
        .post('/users/signup')
        .send(user)
        .expect(200);
    t.truthy(body.data.userId);
});

test.serial('Can authenticate user', async (t) => {
    const { body } = await request(app)
        .post('/users/login')
        .send(user)
        .expect(200);
    token = body.data.token;
    t.truthy(token);
});

test.serial('Can check user auth status', async (t) => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
    t.pass();
});

test.serial('Can reject user without auth', async (t) => {
    await request(app)
        .get('/users/me')
        .set('Authorization', '')
        .expect(400);
    t.pass();
});
