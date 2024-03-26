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

describe('POST /v1/login', () => {
    describe('given a email and a password of an existing user', () => {
        test('should respond with status code of 200', async () => {
            const response = await request(server).post('/v1/login').send({
                email: 'test@gmail.com',
                password: 'ciao'
            })
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('email');
        })
    })

    describe('given correct email but missing password', () => {
        test('should respond with a status code of 400', async () => {
            const response = await request(server).post('/v1/register').send({
                email: 'test@gmail.com',
            })
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({"error": "Email or Password not provided"});
        })
    })

    describe('given correct password but missing email', () => {
        test('should respond with a status code of 400', async () => {
            const response = await request(server).post('/v1/register').send({
                password: 'ciao',
            })
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({"error": "Email or Password not provided"});
        })
    })

    describe('given an incorrect email and password', () => {
        test('should respond with a status code of 400', async () => {
            const response = await request(server).post('/v1/login').send({
                email: 'test@gmail.com',
                password: 'ci'
            })
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({"error": "The Email Address or Password is invalid"});
        })
    })

    describe('given an incorrect email format', () => {
        test('should respond with a status code of 400', async () => {
            const response = await request(server).post('/v1/login').send({
                email: 'test@gmail',
                password: 'ciao'
            })
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({"error": "The Email format is invalid"});
        })
    })
})