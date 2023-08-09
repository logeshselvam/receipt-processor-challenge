const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const mongoose = require('mongoose');
const Receipt=require('../model');
chai.use(chaiHttp);
const expect = chai.expect;

describe('Receipt API', () => {
  before(async () => {
    // Connect to a test database before running the tests
    await mongoose.connect(`mongodb://mongo:27017/testdb`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    // Clean up after tests and disconnect from the database
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('POST /receipts/process', () => {
    it('should create a receipt and return an ID', async () => {
      const receiptData = {
        "retailer": "Target",
        "purchaseDate": "2022-01-02",
        "purchaseTime": "13:13",
        "total": "1.25",
        "items": [
            {"shortDescription": "Pepsi - 12-oz", "price": "1.25"}
        ]
    };

      const res = await chai.request(app).post('/receipts/process').send(receiptData);
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('id');
    });

  });

  describe('GET /receipts/:id/points', () => {
    it('should get points for a valid receipt ID', async () => {
      const receiptData = {
        "retailer": "Target",
        "purchaseDate": "2022-01-02",
        "purchaseTime": "13:13",
        "total": 1.25,
        "items": [
          {"shortDescription": "Pepsi - 12-oz", "price": 1.25}
        ]
      };
  
      // Create a receipt using the /receipts/process endpoint
      const createResponse = await chai.request(app).post('/receipts/process').send(receiptData);
  
      // Get the ID from the create response
      const receiptId = createResponse.body.id;
  
      // Make a request to /receipts/:id/points using the ID
      const res = await chai.request(app).get(`/receipts/${receiptId}/points`);
  
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('points');
    });
  
    it('should return an error for an invalid receipt ID', async () => {
      const invalidId = '609c0f7c132d352ee4a26f99'
  
      const res = await chai.request(app).get(`/receipts/${invalidId}/points`);
  
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('error');
    });
  
  });
});
