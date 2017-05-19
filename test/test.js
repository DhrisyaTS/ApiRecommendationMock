let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server.js');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

// describe('Root API', () => {
//     it('Test the root path.', function (done) {
//         chai.request(server)
//             .get('/')
//             .end(function (err, res) {
//                 res.should.have.status(200);
//                 done();
//             });
//     });


// });

describe('authenticate API', () => {
    it('authenticate api testing', function (done) {
        chai.request(server)
            .post('/api/tokenAuthentication')
            .send({ 'name': 'dhrisya', 'password': 'password' })
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.have.property('message').eql('Enjoy your token!');
                res.body.should.have.property('token');
                done();
            });
    });
});


// describe('SendSuggestion API', () => {
//     it('Recommendation api testing', function (done) {
//         chai.request(server)
//             .post('/api/sendRecommendation')
//             .send({ 'AgentId': '46', 'Message': 'password' })
//             .end(function (err, res) {
//                 res.should.have.status(200);
//                 done();
//             });
//     });
// });