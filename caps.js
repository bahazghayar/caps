'use strict' ; 

const events = require('./events.js');
const vendor = require('./vendor.js');
const driver = require('./driver.js');

setInterval(() => {
    vendor.newOrder();
}, 5000);

events.on('pickup', driver.pickUp);
events.on('inTransit', driver.delivered);
events.on('delivered', vendor.thankYou);

// events.emit('pickup',        );
// events.emit('intransit',          );
// events.emit('delivered',         );

