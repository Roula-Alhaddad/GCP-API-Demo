'use strict';

const express = require('express');
const app = express();
const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore();




//************ Express Routes here **************//
//Default Route
app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});


//getCustomers 
app.get('/getcustomers', async function(req, res) {
    const query = datastore.createQuery('IkeaCustomers')
    const customers = await datastore.runQuery(query);
    res.send(customers).end();
});


//getCustomersbyid
app.get('/getCustomersbyid/:Id', async function(req, res)  {
      const query = datastore.createQuery('IkeaCustomers').filter('Id', req.params.Id ); 
    const customer = await datastore.runQuery(query);
    res.send(customer).end(); 
});


//Catch all other routes
app.get('*', (req, res) => {
  res.send('Invalid Page');
});


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});


module.exports = app;