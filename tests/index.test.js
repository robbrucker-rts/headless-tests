const puppeteer = require('puppeteer');

describe('Hello World Page Tests', () => {
    let browser;
    let page;
    const targetUrl = process.env.TARGET_URL || 'http://localhost:3000';
    const TIMEOUT = 10000;

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

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    async function getGreetingText() {
        try {
            return await page.$eval('h1', el => el.textContent);
        } catch (error) {
            throw new Error(`Failed to get greeting text: ${error.message}`);
        }
    }

    test('should display default greeting without query parameters', async () => {
        await page.goto(targetUrl, { timeout: TIMEOUT });
        const text = await getGreetingText();
        expect(text).toBe('Hello World');
    }, TIMEOUT);

    test('should display first name when firstName parameter is provided', async () => {
        await page.goto(`${targetUrl}?firstName=Rob`, { timeout: TIMEOUT });
        const text = await getGreetingText();
        expect(text).toBe('Hello Rob');
    }, TIMEOUT);

    test('should append last name when lastName parameter is provided', async () => {
        await page.goto(`${targetUrl}?lastName=Bruck`, { timeout: TIMEOUT });
        const text = await getGreetingText();
        expect(text).toBe('Hello World Bruck');
    }, TIMEOUT);

    test('should display full name when both parameters are provided', async () => {
        await page.goto(`${targetUrl}?firstName=rob&lastName=Bruck`, { timeout: TIMEOUT });
        const text = await getGreetingText();
        expect(text).toBe('Hello rob Bruck');
    }, TIMEOUT);

});