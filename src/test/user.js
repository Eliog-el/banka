import chai from "chai"
import server from "../app.js"

//Assertion style
chai.should();

chai.use(chaiHttp);

describe('API', () => {
    /**
     * Test the server
     */
    describe('SERVER', () => {
        it('It should get all the tasks', (done) => {
            chai.request(server)
            .get
        })
    } )
})
