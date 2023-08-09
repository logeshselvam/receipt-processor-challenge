# receipt-processor-challenge

# Command to start
docker-compose up --build  
This command will install the necessary packages and will check for the test case and start the server .
server will start at the 3000 port .

# Api Details : 
# Description :Submits a receipt for processing
URL : http://localhost:3000/receipts/process
Type: POST
Body : {
  "retailer": "M&M Corner Market",
  "purchaseDate": "2022-03-20",
  "purchaseTime": "14:33",
  "items": [
    {
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    },{
      "shortDescription": "Gatorade",
      "price": "2.25"
    }
  ],
  "total": "9.00"
}

Response : {"id": "64d326e630b011a58c69abc3"}

# Description :Returns the points awarded for the receipt

URL : http://localhost:3000/receipts/64d326e630b011a58c69abc3/points
Type: GET
Response : { "points": 109}

# server.js
This Files has the node server and mongo server start commands 
Note: -> When you restart the server the old receipt data will be deleted from the DB.

# app.js
This file has the api that was mentioned in the README file.
I have added 2 api to perform the receipt creation and the api to get the points .

# model.js
This file contains the receipt schema details.

# utils.js 
This file contains two utility methods , first one to create the points based on the rules and validate the receipt json structure.

# test -> test.js 
contains the test case for the 2 required api 

# .env
This file contains the Local Database URL

i have added the docker compose to combine the node and mongo server .

Looking forward for the call.

