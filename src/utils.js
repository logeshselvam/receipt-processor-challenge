
const Receipt=require("./model");

function calculatePoints(receipt) {
    let points = 0;

    // Rule 1: One point for every alphanumeric character in the retailer name
    points += (receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length);

    // Rule 2: 50 points if the total is a round dollar amount with no cents
    if (Number.isInteger(+(receipt.total)) && +(receipt.total) % 1 === 0) {
        points += 50;
    }

    // Rule 3: 25 points if the total is a multiple of 0.25
    if (+(receipt.total) % 0.25 === 0) {
        points += 25;
    }
    // Rule 4: 5 points for every two items on the receipt
    points += Math.floor(receipt.items.length / 2) * 5;

    // Rule 5: If the trimmed length of the item description is a multiple of 3,
    // multiply the price by 0.2 and round up to the nearest integer.
    receipt.items.forEach(item => {
        const trimmedLength = item.shortDescription.trim().length;
        if (trimmedLength % 3 === 0) {
            const itemPoints = Math.ceil(item.price * 0.2);
            points += itemPoints;
        }
    });
    // Rule 6: 6 points if the day in the purchase date is odd
    const purchaseDate = new Date(receipt.purchaseDate);
    if (purchaseDate.getUTCDate() % 2 !== 0) {
        points += 6;
    }
    // Rule 7: 10 points if the time of purchase is after 2:00pm and before 4:00pm
    const purchaseTime = new Date(`${receipt.purchaseDate}T${receipt.purchaseTime}`);
    if (purchaseTime.getHours() >= 14 && purchaseTime.getHours() < 16) {
        points += 10;
    }

    return points;
  }


  // Validate receipt data
function isValidReceipt(receiptData) {
  // Create a new Receipt document with the provided data
  const tempReceipt = new Receipt(receiptData);

  // Validate the document against the schema
  const validationError = tempReceipt.validateSync();

  if (validationError) {
    // There are validation errors
    console.log('Validation Errors:', validationError.errors);
  
    for (const field in validationError.errors) {
      console.log(`${field} Error: ${validationError.errors[field]?.message}`);
    }
  } else {
    // Data is valid
    console.log('Data is valid');
  }

  // If validationError is present, the data is invalid
  return !validationError;
}


  module.exports = {
    calculatePoints,
    isValidReceipt
  }
  