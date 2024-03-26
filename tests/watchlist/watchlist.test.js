const request = require('supertest');
const server = require('../../server');
const { registerUserIntoDatabase, deleteAllUsers } = require('../../app/register/register.data-access');
const { hashPassword } = require('../../helpers/register/register.helper');

let id;

beforeEach(async () => {
    const hash = await hashPassword('ciao');

    const user = await registerUserIntoDatabase(
        'test',
        'test@gmail.com',
        hash)

    id = user[0].id;
})

afterEach(async () => {
    await deleteAllUsers();
})

describe('POST /v1/watchlist', () => {
    describe('given the user id, asset name and symbol', () => {
        test('should respond with status code of 200 and register the new asset in database', async () => {
            const response = await request(server).post('/v1/watchlist/add_asset').send({
                user_id: id,
                asset_name: 'Nvidia Corporation',
                asset_symbol: 'NVDA'
            })
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('asset_name');
        })
    })

    describe('given the user id', () => {
        test('should respond with a status code of 200 and the watchlist of the user', async () => {
            const response = await request(server).post('/v1/watchlist/load_watchlist').send({
                user_id: id - 1,
            })
            expect(response.statusCode).toBe(200);
            for (asset of response.body) {
                expect(asset).toHaveProperty('id');
            }
        })
    })

    describe('given the user id, asset name and symbol', () => {
        test('should respond with status code of 200 and remove the new asset in database', async () => {
            const response = await request(server).post('/v1/watchlist/remove_asset').send({
                user_id: id - 2,
                asset_name: 'Nvidia Corporation',
                asset_symbol: 'NVDA'
            })
            expect(response.statusCode).toBe(200);
        })
    })
})