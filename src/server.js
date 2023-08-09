const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

init();
connect_mongo();

async function init() {
  try {
    app.listen(3000, () => {
      console.log('Express App Listening on Port 3000'); 
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}


let connection;
async function connect_mongo() {

  //Have defined the value in the env file 
  const { DATABASE_HOST = 'mongo' } = process.env;
  const DATABASE_LOCAL = `mongodb://${DATABASE_HOST}:27017/receipts`;
  try {
    connection =  await mongoose.connect(DATABASE_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Call the deleteAllReceipts function once connected
    await deleteAllReceipts();
    
    console.log('Connected to MongoDB');
    return connection;
  } catch (e) {
    console.error("Could not connect to MongoDB...");
    throw e;
  }
};

function getConnection() {
  return connection;
}

// Delete all documents from the Receipt collection
async function deleteAllReceipts() {
  const Receipt=require('./model');
  try {
    await Receipt.deleteMany({});
    console.log('All receipts deleted.');
  } catch (error) {
    console.error('Error deleting receipts:', error);
  }
}



module.exports = { getConnection };