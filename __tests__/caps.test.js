'use strict';

const faker = require('faker');
const vendor = require('../vendor.js');
const driver = require('../driver.js');
const caps = require('../caps.js');

let testOrder = {
  store: 'ShipShop',
  orderID: faker.datatype.uuid(),
  customer: faker.name.findName(),
  address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
};

let testPayload = {
  event: 'pickup',
  time: new Date().toISOString(),
  payload: testOrder,
};

describe('Events testS', () => {
  let consoleSpy;
  jest.useFakeTimers();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('start a new order', () => {
    vendor.newOrder();
    expect(consoleSpy).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalled();
  });

  it('Driver should picks up orders after 1 sec', () => {
    driver.pickUp(testPayload);
    expect(consoleSpy).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  it('Driver should deliver orders after 3 second', () => {
    driver.delivered(testPayload);
    expect(consoleSpy).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
  });

  it('Vendor should send thank you', () => {
    vendor.thankYou(testPayload);
    expect(consoleSpy).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledTimes(3);
  });
});