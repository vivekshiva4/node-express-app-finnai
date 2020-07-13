import supertest from 'supertest'
import app from '../app'
import 'regenerator-runtime/runtime';
let userId;

describe("Testing the user API",  () => {

    it("this test will get all the users", async () => {
        const response = await supertest(app)
            .get('/user')
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe('Users retrieved successfully')
        expect(response.body).toHaveProperty('data');
    });

    it("this test will create the user", async () => {
        const response = await supertest(app)
            .post('/user')
            .set('Content-Type', 'application/json')
            .send({
                firstName : 'vivek',
                lastName : 'shiva',
                email : 'vivekshiva4@gmail.com'
            });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe('user added successfully')
        userId = response.body.user.id
    });

    it("this test will get the user with userId", async () => {
        const response = await supertest(app)
            .get('/user/' + userId)
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true)
        expect(response.body.message).toBe('user retrieved successfully')
        expect(response.body).toHaveProperty('user');
    });

    it("this test will not get the user with userId", async () => {
        const response = await supertest(app)
            .get('/user/' + "4343-38383-99099303039")
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('user does not exist')
    });

    it("this test will not create the user for firstName missing field", async () => {
        const response = await supertest(app)
            .post('/user')
            .set('Content-Type', 'application/json')
            .send({
                lastName : 'shiva',
                email : 'vivekshiva4@gmail.com'
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('first name is required')
    });

    it("this test will not create the user for lastName missing field", async () => {
        const response = await supertest(app)
            .post('/user')
            .set('Content-Type', 'application/json')
            .send({
                firstName : 'vivek',
                email : 'vivekshiva4@gmail.com'
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('last name is required')
    });

    it("this test will not create the user for email missing field", async () => {
        const response = await supertest(app)
            .post('/user')
            .set('Content-Type', 'application/json')
            .send({
                firstName : 'vivek',
                lastName : 'shiva',
            });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false)
        expect(response.body.message).toBe('email  is required')
    });


});
