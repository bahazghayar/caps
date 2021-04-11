'use strict' ;

// Declare your store name (perhaps in a .env file, so that this module is re-usable)
// Every 5 seconds, simulate a new customer order
// Create a fake order, as an object:
// storeName, orderId, customerName, address
// Emit a ‘pickup’ event and attach the fake order as payload
// HINT: Have some fun by using the faker library to make up phony information
// Monitor the system for events …
// Whenever the ‘delivered’ event occurs
// Log “thank you” to the console

const events = require('./events.js');
require('dotenv').config() ; 
const faker = require('faker');

const storeName = process.env.STORENAME ;

function createOrder() {
  let order = {
    store: storeName,
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };
  return order;
}

function newOrder() {
  events.emit('pickup', {
    event: 'pickup',
    time: new Date().toISOString(),
    payload: createOrder(), 
  });
}

function thankYou(payload) {
    payload.event = 'delivered';
    payload.time = new Date().toISOString();
    console.log(`VENDOR: Thank you for delivering ${payload.payload.orderID}`);
    console.log('EVENT ', payload);
}

module.exports = {
  newOrder,
  thankYou
};