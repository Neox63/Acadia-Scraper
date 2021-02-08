const config = require('../config/config.json');

const api =  {
    async connect(browser, url) {
        const username = config.Acadia.username;
        const password = config.Acadia.password;

        const loginSelector = '#email';
        const passwordSelector = '#passwd';
        const submitButton = 'button[name=SubmitLogin]';
        
        let page = await browser.newPage();

        try {
            await page.goto(url);

            await page.waitForSelector('.container');
    
            await page.type(loginSelector, username, { delay: 10 });
            await page.type(passwordSelector, password, { delay: 10 });

            await page.keyboard.press('Enter');

            await page.waitForTimeout(5000)

            console.log("I'm connected to http://www.acadia-info.com/ ! Let's get started !");

        } catch (e) {
            console.log(e);
            console.log("I failed to connect to http://www.acadia-info.com/, make sure your credentials are right at '../config/config.json'");
        }
    }
}

module.exports = api ;