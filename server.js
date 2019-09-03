'use strict';

const express = require('express');
const app = express();
const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore();
const PORT = process.env.PORT || 8080;
const ENTITY ='IkeaCustomers';

app.get('/', (req, res) => {
  res.send('Ikea Customers');
});
//getCustomers 
app.get('/getCustomers', async function(req, res) {
    const query = datastore.createQuery(ENTITY);
    const customers = await datastore.runQuery(query);
    res.send(customers).end();
});
//getCustomersbyid
app.get('/getCustomer/:id', async function(req, res)  {	
    const customerId = Number(req.params.id);
    const query = datastore.createQuery(ENTITY).filter('id', customerId ); 
    const customer = await datastore.runQuery(query);
    res.send(customer).end(); 
});
app.get('*', (req, res) => {
  res.send('Invalid Page');
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
module.exports = app;