import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Puppeteer from 'puppeteer';
import calculateTransactionTotalEUR from './helpers/calculateTransactionTotalEUR';
import validateIsNumber from './helpers/validateIsNumber';
import validateName from './helpers/validateName';
import { watchFile } from 'fs';

let page;
let browser;

describe('Helpers', () => {

  it('should sum values properly', () => {
    const testTransactionsValues_1 = [
      { ValueEUR: 1500 },
      { ValueEUR: 1500 }
    ];

    const result = calculateTransactionTotalEUR(testTransactionsValues_1);
    expect(result).toBe(3000);
  });

  it('should sum values properly', () => {
    const testTransactionsValues_1 = [
      { ValueEUR: 0.50 },
      { ValueEUR: 0.50 }
    ];

    const result = calculateTransactionTotalEUR(testTransactionsValues_1);
    expect(result).toBe(1);
  });

  it('should sum values properly', () => {
    const testTransactionsValues_1 = [
      { ValueEUR: 0.1 },
      { ValueEUR: 0.2 }
    ];

    const result = calculateTransactionTotalEUR(testTransactionsValues_1);
    expect(result).toBe(0.30000000000000004); // Calculations are made on normal values. Only display values are formatted to 2 decimal places. 
  });

  it('should validate number', () => {
    const number = 10;
    const result = validateIsNumber(number);
    expect(result).toBe(number);
  });

  it('should validate number', () => {
    const number = 15.5;
    const result = validateIsNumber(number);
    expect(result).toBe(number);
  });

  it('should validate number', () => {
    const number = 5 + 5;
    const result = validateIsNumber(number);
    expect(result).toBe(number);
  });

  it('should validate number', () => {
    const number = 0.9999;
    const result = validateIsNumber(number);
    expect(result).toBe(number);
  });

  it('should validate numeric string properly', () => {
    const number = "0.9999";
    const result = validateIsNumber(number);
    expect(result).toBe(parseFloat(number));
  });

  it('should validate numeric string properly', () => {
    const number = "15+15";
    const result = validateIsNumber(number);
    expect(result).toBe(parseFloat(number));
  });

  it('should validate numeric string properly', () => {
    const number = "10";
    const result = validateIsNumber(number);
    expect(result).toBe(parseFloat(number));
  });

  it('should validate numeric string properly', () => {
    const number = "I'm not a number";
    const result = validateIsNumber(number);
    expect(result).toBe(undefined);
  });

  it('should validate transaction name properly', () => {
    const name = "Transaction A";
    const result = validateName(name);
    expect(result).toBe(name);
  });

  it('should validate transaction name properly', () => {
    const name = "";
    const result = validateName(name);
    expect(result).toBe(undefined);
  });

  it('should validate transaction name properly', () => {
    const name = "             ";
    const result = validateName(name);
    expect(result).toBe(undefined);
  });

  it('should validate transaction name properly', () => {
    const name = "Too looooooooooooooooong transaction";
    const result = validateName(name);
    expect(result).toBe(undefined);
  });

});

describe('React', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});
describe('Demo App', () => {

  beforeAll(async () => {
    browser = await Puppeteer.launch({ headless: false });
    page = await browser.newPage();
  });

  it('should load page', async () => {
    await page.goto('https://eurotransactions.herokuapp.com/'); //DEMO APP with master github branch
  });

  it('total PLN should be correct and fetched from NBP', async () => {
    await page.waitFor(1000); 
  });

});