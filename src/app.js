const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const { calculatePoints, isValidReceipt }=require('./utils');
const Receipt=require('./model');


/**
 *
 * @returns receipt by id
 */

app.post('/receipts/process', async (req, res) => {
  try{
    const receiptData = req.body;

    // Validate receiptData
    if (!isValidReceipt(receiptData)) {
      return res.status(400).json({ error: 'Invalid receipt data' });
    }

    // Logic to calculate points here based on the rules
    // described in the problem statement

    const points = calculatePoints(receiptData) /* Calculate points based on receipt */;
    const receipt = await Receipt.create({
      ...receiptData,
      points
    });
    
    res.status(200).json({id :receipt?._id  });
  }catch(error){
    return res.status(500).json({ error : `Internal Server Error - ${error.message}`});
  }
});


/**
 *
 * @returns points by id
 */

app.get('/receipts/:id/points', async (req, res) => {
  try {
    const { id } = req.params;
    const receipt = await Receipt.findOne({ _id : id}).lean();
    if (!receipt) return res.status(404).json({error:`No receipt found for that id - ${id}`});
    res.status(200).json({points :receipt?.points });
  } catch (error) {
    return res.status(500).json({ error : `Internal Server Error - ${error.message}`});
  }
});


module.exports = app;
