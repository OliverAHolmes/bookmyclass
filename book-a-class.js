require('dotenv').config();
const puppeteer = require('puppeteer');

const loggedCheck = async (page) => {
    try {
        await page.waitForSelector('.devices-frame_title', { timeout: 10000 });
        return true;
    } catch(err) {
        return false;
    }
};

const bookingPageCheck = async (page) => {
    try {
        await page.waitForSelector('.sessions', { timeout: 10000 });
        return true;
    } catch(err) {
        return false;
    }
};

async function run () {

    const browser = await puppeteer.launch({
        executablePath:'/usr/bin/chromium'
    });
    const page = await browser.newPage()
    const navigationPromise = page.waitForNavigation()

    console.log('Start');
    await page.goto(process.env.HOME_URL);

    await page.setViewport({ width: 1512, height: 691 });

    await navigationPromise
    
    const openedLoginPage = await page.evaluate(() => {
        return !!document.querySelector('.content > form > .login-panel > .title- > p') // !! converts anything to boolean
    });

    console.log(openedLoginPage);

    await page.type('.email--', process.env.USER_EMAIL);
    await page.type('.password--', process.env.USER_PASSWORD);
    await page.click('.red-btn--');

    await navigationPromise

    isLogged = await loggedCheck(page);
    console.log(isLogged);

    await page.goto(process.env.BOOKING_URL);

    await navigationPromise

    isBookingPage = await bookingPageCheck(page);
    console.log(isBookingPage);

    for (const parent of await page.$$('.sessions')) {
    
        let value = await page.evaluate(el => el.textContent, parent)
        console.log(value);
    
    }

    await browser.close();

    console.log('End');
}
run();