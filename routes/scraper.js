const scraper = {
    index: 1,
    pageIndex: 1,

    async scraper(browser, url, hasPagination) {
        let page = await browser.newPage();

        await page.goto(url);

        let scrapedData = [];

        const scrapeCurrentPage = async () => {
            await page.waitForSelector('#products');
            
            let urls = await page.$$eval('.products > .item-product', links => {
                links = links.map((el) => el.querySelector('.product-title > a').href);

                return links;
            });

            const pagePromise = (link) => new Promise (async (resolve, reject) => {
                let dataObject = {};
                let newPage = await browser.newPage();
                let msAtStart = Date.now();

                await newPage.setDefaultNavigationTimeout(0); 
                await newPage.goto(link);

                try {
                    dataObject['title'] = await newPage.$eval('h1.h1', text => text.textContent);

                } catch (e) {
                    dataObject['title'] = "Titre non disponible";
                }

                try {
                    dataObject['image'] = await newPage.$eval('#zoom', img => img.src);

                } catch (e) {
                    dataObject['image'] = "Image non disponible";
                }

                try {
                    dataObject['sku'] = await newPage.$eval('.befor_product_features :nth-child(2)', text => text.textContent.substring(text.textContent.indexOf(":") + 2));

                } catch (e) {
                    dataObject['sku'] = "SKU non disponible";
                }

                try {
                    dataObject['ean'] = await newPage.$eval('.befor_product_features :nth-child(1)', text => text.textContent.substring(text.textContent.indexOf(":") + 2));

                } catch (e) {
                    dataObject['ean'] = "EAN non disponible";
                }

                try {
                    dataObject['price'] = await newPage.$eval('.current-price :nth-child(2)', text => text.textContent);

                } catch (e) {
                    dataObject['price'] = "Prix non disponible";
                }

                try {
                    dataObject['stock'] = await newPage.$eval('.message-availability > span', text => text.textContent);

                } catch (e) {
                    dataObject['stock'] = "Plus de 200";
                }

                try {
                    dataObject['weight'] = await newPage.$eval('.befor_product_features :nth-child(3)', text => text.textContent.substring(text.textContent.indexOf(":") + 2));

                } catch (e) {
                    dataObject['weight'] = "Poid non disponible";
                }

                try {
                    dataObject['description'] = await newPage.$eval('.product-d > table > tbody > :nth-child(2)', text => text.textContent);

                } catch (e) {
                    dataObject['description'] = "Description non disponible";
                }

                try {
                    dataObject['categorie'] = await newPage.$$eval('.breadcrumb > ol > li > a > span', el => el[2].textContent);

                } catch (e) {
                    dataObject['categorie'] = "Catégorie non disponible";
                }

                try {
                    dataObject['sous_categorie_1'] = await newPage.$$eval('.breadcrumb > ol > li > a > span', el => el[3].textContent);

                } catch (e) {
                    dataObject['sous_categorie_1'] = "Sous Catégorie non disponible";
                }

                console.log(`[Acadia] - Product ${this.index} has been scrapped successfully [~${Date.now() - msAtStart} ms]`);
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
                    const nextButton = await page.$eval('a.next', a => a.textContent);
                    nextButtonExist = true;
    
                } catch (e) {
                    nextButtonExist = false; 
                    console.log("Nothing else to scrap there, going forward !");
                    this.index = 1;
                    this.pageIndex = 2; 
                }
    
                if (nextButtonExist) {
                    await page.click('a.next');
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