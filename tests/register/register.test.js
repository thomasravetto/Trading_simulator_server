const request = require('supertest');
const server = require('../../server');
const { registerUserIntoDatabase, deleteAllUsers } = require('../../app/register/register.data-access');
const { hashPassword } = require('../../helpers/register/register.helper');

beforeEach(async () => {
    const hash = await hashPassword('ciao');

    await registerUserIntoDatabase(
        'test',
        'test@gmail.com',
        hash)
})

afterEach(async () => {
    await deleteAllUsers();
})

describe('POST /v1/register', () => {
    describe('given a username and a password of a new user', () => {
        test('should respond with status code of 200 and register a new user in database', async () => {
            const response = await request(server).post('/v1/register').send({
                username: 'test2',
                email: 'test2@gmail.com',
                password: 'ciao'
            })
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('email');
        })
    })

    describe('given missing username or password', () => {
        test('should respond with a status code of 400', async () => {
            const response = await request(server).post('/v1/register').send({
                username: 'test',
                email: 'test@gmail.com',
            })
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({"error": "Email or Password not provided"})
        })
    })

    describe('given a username and password of an existing user', () => {
        test('should respond with status code of 400', async () => {
            const response = await request(server).post('/v1/register').send({
                username: 'test',
                email: 'test@gmail.com',
                password: 'ciao'
            })
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({"error": "User already exists"})
        })
    })
})