var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');

var expect = chai.expect;

chai.use(chaiHttp);

describe('findToy API', () => {
    
    it('Should return right object when object is present', (done) => {
        findToyByID(done);
    });

    it('Should return empty object when id is not found', (done) => {
        noToyWithThatID(done);
    });

});


function findToyByID(done) {
    chai.request(app)
    .get('/findToy?id=1')
    .end( (err, res) => {
        let toy = res.body;
        expect(toy.id === "1", 'Toy id is not set correctly').to.equal(true);
        expect(toy.name === "Car", 'Toy name is not set correctly').to.equal(true);
        expect(toy.price === 7, 'Toy price is not set correctly').to.equal(true);
        done();
    });
}


function noToyWithThatID(done) {
    chai.request(app)
    .get('/findToy?id=999')
    .end( (err, res) => {
        let toy = res.body;
        expect(toy).to.be.empty;
        done();
    });
}