//Import the core dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//Set up the body parser package
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Set the AT authentication credentials
const credentials = {
  username: "YOUR_USERNAME_GOES_HERE",
  apiKey: "YOUR_API_KEY_GOES_HERE"
};

//initialize the AT SDK
const AfricasTalking = require('africastalking')(credentials);

//Get the SMS service
sms = AfricasTalking.SMS

app.post('/payment-notification', async (req, res) => {
  //obtain the values returned by AT
  const status = req.body.status;
  const amount = req.body.value;
  const product = req.body.clientAccount;
  const time = req.body.transactionDate;
  const phoneNumber = req.body.source;

  //check if status message is a "success"
  if (status == "success") {
      successMessage = `Your payment of ${amount} was sent to ${product} at .${time}. Thank you`;
      sms.send(successMessage, phoneNumber);
  } else {
    failureMessage = `Your payment of ${amount} was not sent to ${product}. Please try again`
    sms.send(failureMessage, phoneNumber);
  }

});
