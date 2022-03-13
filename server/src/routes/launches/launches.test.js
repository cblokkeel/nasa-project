const request = require('supertest')
const app = require('../../app')

describe('Test GET /launches', () => {
    test('it should respond with 200 success', async () => {
        const response = await request(app).get('/launches').expect(200)
        //expect(response.statusCode).toBe(201)
    })
})

describe('Test POST /launch', () => {
    const launch = {
        mission: 'test mission',
        rocket: 'test rocket',
        target: 'test target',
        launchDate: 'April 20, 2022'
    }

    const launchWithoutDate = {
        mission: 'test mission',
        rocket: 'test rocket',
        target: 'test target',
    }

    const launcInvalidDate = {
        mission: 'test mission',
        rocket: 'test rocket',
        target: 'test target',
        launchDate: 'pas cool la date'
    }
    
    test('it should respond with 201 success', async () => {
        const response = await request(app).post('/launches')
            .send(launch)
            .expect('Content-Type', /json/)
            .expect(201)

        const reqDate = new Date(launch.launchDate).valueOf
        const resDate = new Date(response.launchDate).valueOf
        
        expect(reqDate).toBe(resDate)
        expect(response.body).toMatchObject(launchWithoutDate)
    })
    
    test('it should catch missing data', async () => {
        const response = await request(app).post('/launches')
            .send(launchWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400)

        expect(response.body).toStrictEqual({
            error: 'missing data'
        })
    })
    
    test('it should catch invalid date', async () => {
        const response = await request(app).post('/launches')
            .send(launcInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400)

        expect(response.body).toStrictEqual({
            error: 'invalid launch date'
        })
    })
}) 