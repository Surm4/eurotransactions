import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Puppeteer from 'puppeteer';

let page;
let browser;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

beforeAll(async () => {
  browser = await Puppeteer.launch({ headless: false });
  page = await browser.newPage();
});

it('should load page', async () => {
  await page.goto('localhost:3000');
});