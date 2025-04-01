const puppeteer = require('puppeteer');

describe('Hello World Page Tests', () => {
    let browser;
    let page;
    const targetUrl = process.env.TARGET_URL || 'http://localhost:3000';

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            executablePath: '/usr/bin/chromium',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Default greeting shows Hello World', async () => {
        await page.goto(targetUrl);
        const text = await page.$eval('h1', el => el.textContent);
        expect(text).toBe('Hello World');
    });

    test('Custom name shows in greeting', async () => {
        await page.goto(`${targetUrl}?name=Rob`);
        const text = await page.$eval('h1', el => el.textContent);
        expect(text).toBe('Hello Rob');
    });
});