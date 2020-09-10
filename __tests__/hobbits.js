const supertest = require("supertest")
const server = require("../server")
const db = require("../data/config")

beforeEach(async () => {
    // run the seeds programatically before each test to start fresh
    await db.seed.run()
})

afterAll(async() => {
    // close the database connection so the test process doesn't hang or give a warning
    await db.destroy()
})

describe("hobbits integrations tests", () => {
    it("GET /hobbits", async () => {
        const res = await supertest(server).get("/hobbits")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBeGreaterThanOrEqual(4)
        expect(res.body[0].name).toBe("sam")
    })
    
    it("GET /hobbits/:id", async () => {
        const res = await supertest(server).get("/hobbits/2")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("frodo")
    })

    it("GET /hobbits/:id", async () => {
        const res = await supertest(server).get("/hobbits/50")
        expect(res.statusCode).toBe(404)
    })

    it("POST /hobbits", async () => {
        const res = await supertest(server).post("/hobbits")
        .send({name: "bilbo"})
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("bilbo")
    })
})
