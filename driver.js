'use strict' ; 

// Monitor the system for events …
// On the ‘pickup’ event …
// Wait 1 second
// Log “DRIVER: picked up [ORDER_ID]” to the console.
// Emit an ‘in-transit’ event with the payload you received
// Wait 3 seconds
// Log “delivered” to the console
// Emit a ‘delivered’ event with the same payload

const events = require('./events.js');

function pickUp(payload) {
  console.log('EVENT ', payload); 
  console.log(`DRIVER: picked up ${payload.payload.orderID}`);
  setTimeout(() => {
    events.emit('inTransit', payload);
  }, 1000);
}

function delivered(payload) {
  payload.event = 'inTransit';
  payload.time = new Date().toISOString(); 
  console.log('EVENT ', payload); 
  setTimeout(() => {
    console.log(`DRIVER: delivered up ${payload.payload.orderID}`); 
    events.emit('delivered', payload);
  }, 3000);
}

module.exports = { 
  pickUp, 
  delivered 
};
