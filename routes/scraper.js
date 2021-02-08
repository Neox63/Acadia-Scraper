const scraper = {
    index: 1,
    pageIndex: 1,

    async scraper(browser, url, hasPagination) {
        let page = await browser.newPage();

        await page.goto(url);

        let scrapedData = [];

        const scrapeCurrentPage = async () => {
            await page.waitForSelector('.main-content-inner');
            
            let urls = await page.$$eval('.product_list > li', links => {
                links = links.map((el) => el.querySelector('.product_img_link').href);

                return links;
            });

            const pagePromise = (link) => new Promise (async (resolve, reject) => {
                let dataObject = {};
                let newPage = await browser.newPage();
                let msAtStart = Date.now();

                await newPage.setDefaultNavigationTimeout(0); 
                await newPage.goto(link);

                try {
                    dataObject['title'] = await newPage.$eval('h2', text => text.textContent);

                } catch (e) {
                    dataObject['title'] = "Titre non disponible";
                }

                try {
                    dataObject['image'] = await newPage.$eval('#bigpic', img => img.src);

                } catch (e) {
                    dataObject['image'] = "Image non disponible";
                }

                try {
                    dataObject['sku'] = await newPage.$eval('ul.product-refence-list > li:nth-child(2) > span', text => text.textContent);

                } catch (e) {
                    dataObject['sku'] = "SKU non disponible";
                }

                try {
                    dataObject['ean'] = await newPage.$eval('ul.product-refence-list > li:nth-child(3) > span', text => text.textContent);

                } catch (e) {
                    dataObject['ean'] = "EAN non disponible";
                }

                try {
                    dataObject['price'] = await newPage.$eval('.our_price_display', text => text.textContent);

                } catch (e) {
                    dataObject['price'] = "Prix non disponible";
                }

                try {
                    dataObject['stock'] = await newPage.$eval('#quantityAvailable', text => text.textContent);

                } catch (e) {
                    dataObject['stock'] = "Stock inconnu";
                }

                try {
                    dataObject['weight'] = await newPage.$eval('ul.product-refence-list > li:nth-child(4) > span', text => text.textContent);

                } catch (e) {
                    dataObject['weight'] = "Poid non disponible";
                }

                try {
                    dataObject['description'] = await newPage.$eval('#short_description_content', text => text.textContent);

                } catch (e) {
                    dataObject['description'] = "Description non disponible";
                }

                console.log(`Product ${this.index} has been scrapped successfully [~${Date.now() - msAtStart} ms]`);
                this.index++;

                resolve(dataObject);

                await newPage.close();
            });

            for (link in urls) {
                const currentPageData = await pagePromise(urls[link]);
                scrapedData.push(currentPageData);
            }

            if (hasPagination) {
                let nextButtonExist = true;

                try {
                    const nextButton = await page.$eval('.pagination_next.disabled', a => a.textContent);
                    console.log("Nothing else to scrap there, going forward !");
                    this.index = 1;
                    this.pageIndex = 2;
                    nextButtonExist = false;
    
                } catch (e) {
                    nextButtonExist = true;  
                }
    
                if (nextButtonExist) {
                    await page.click('.pagination_next');
                    this.pageIndex++;
                    console.log(`Navigating to the next page... (${this.pageIndex})`);
    
                    return scrapeCurrentPage();
                }
            }

            await page.close();

            return scrapedData;
        }

        let data = await scrapeCurrentPage();

        return data;
    }
}

module.exports = scraper;