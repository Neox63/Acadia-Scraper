const pageScraper = require('../routes/scraper.js');
const fs = require('fs').promises;
const xlsx = require('json-as-xlsx');
const api = require('../routes/api.js');
const convert = require('../utils/convertTime.js');

const scrapeAll = async (browserInstance) => {
    let browser;

    try {
        let timeAtStart = Date.now();
        let fileName = 'acadia-scraping';

        browser = await browserInstance;
        
        await api.connect(browser, 'https://www.acadia-info.com/connexion');

        const network = await pageScraper.scraper(browser, 'https://www.acadia-info.com/306-reseaux-et-connectiques', true);
        await fs.writeFile('./assets/network.json', JSON.stringify(network), 'utf-8', (err) => { if (err) return console.log(err); });
        
        const streaming = await pageScraper.scraper(browser, 'https://www.acadia-info.com/350-streaming', false);
        await fs.writeFile('./assets/streaming.json', JSON.stringify(streaming), 'utf-8', (err) => { if (err) return console.log(err); });

        const audio = await pageScraper.scraper(browser, 'https://www.acadia-info.com/336-audio-et-video', false);
        await fs.writeFile('./assets/audio.json', JSON.stringify(audio), 'utf-8', (err) => { if (err) return console.log(err); });

        const software = await pageScraper.scraper(browser, 'https://www.acadia-info.com/296-logiciels', false);
        await fs.writeFile('./assets/software.json', JSON.stringify(software), 'utf-8', (err) => { if (err) return console.log(err); });

        const domotique = await pageScraper.scraper(browser, 'https://www.acadia-info.com/283-domotique', false);
        await fs.writeFile('./assets/domotique.json', JSON.stringify(domotique), 'utf-8', (err) => { if (err) return console.log(err); });

        const peripherique = await pageScraper.scraper(browser, 'https://www.acadia-info.com/247-peripherique', true);
        await fs.writeFile('./assets/peripherique.json', JSON.stringify(peripherique), 'utf-8', (err) => { if (err) return console.log(err); });
        
        const printer = await pageScraper.scraper(browser, 'https://www.acadia-info.com/228-imprimantes-et-scanners', true);
        await fs.writeFile('./assets/printer.json', JSON.stringify(printer), 'utf-8', (err) => { if (err) return console.log(err); });

        const composants = await pageScraper.scraper(browser, 'https://www.acadia-info.com/176-composants-pc', true);
        await fs.writeFile('./assets/composants.json', JSON.stringify(composants), 'utf-8', (err) => { if (err) return console.log(err); });

        const portablePC = await pageScraper.scraper(browser, 'https://www.acadia-info.com/151-ordinateurs-portables', true);
        await fs.writeFile('./assets/portablePC.json', JSON.stringify(portablePC), 'utf-8', (err) => { if (err) return console.log(err); });
        
        const desktopPC = await pageScraper.scraper(browser, 'https://www.acadia-info.com/147-pc-bureau', true);
        await fs.writeFile('./assets/desktopPC.json', JSON.stringify(desktopPC), 'utf-8', (err) => { if (err) return console.log(err); });
        
        let timeAtEnd = Date.now();

        const time = convert(timeAtEnd - timeAtStart);
  
        console.log(`Scrapping finished in ${time}`);
        
        const json_streaming = require('../assets/streaming.json');
        const json_audio = require('../assets/audio.json');
        const json_network = require('../assets/network.json');
        const json_software = require('../assets/software.json');
        const json_domotique = require('../assets/domotique.json');
        const json_peripherique = require('../assets/peripherique.json');
        const json_printer = require('../assets/printer.json');
        const json_composants = require('../assets/composants.json');
        const json_portablePC = require('../assets/portablePC.json');
        const json_desktopPC = require('../assets/desktopPC.json');

        const columns = [
            { label: 'Titre', value: 'title' },
            { label: 'EAN', value: 'ean' },
            { label: 'SKU', value: 'sku' },
            { label: 'Image', value: 'image' },
            { label: 'Description', value: 'description' },
            { label: 'Poids', value: 'weight' },
            { label: 'Stock', value: 'stock' },
            { label: 'Prix HT', value: 'price' },
            { label: 'Catégorie', value: 'categorie' },
            { label: 'Sous Catégorie', value: 'sous_categorie_1' }
        ];

        const content = [ 
            ...json_streaming,
            ...json_audio,
            ...json_network,
            ...json_software,
            ...json_domotique,
            ...json_peripherique,
            ...json_printer,
            ...json_composants,
            ...json_portablePC,
            ...json_desktopPC
        ];

        const settings = {
            sheetName: 'Acadia-Scraping',
            fileName: fileName,
            extraLength: 3,
            writeOptions: {}
        }

        const download = true;

        xlsx(columns, content, settings, download);
        
        console.log(`[Acadia] - Data has been converted to .xlsx at './${fileName}.xlsx'`);

        browser.close();

    } catch (e) {
        console.log(e);
    }

    return browser;
}

module.exports = (browserInstance) => scrapeAll(browserInstance)