const pageScraper = require('../routes/scraper.js');
const fs = require('fs').promises;
const xlsx = require('json-as-xlsx');
const api = require('../routes/api.js');
const convert = require('../utils/convertTime.js');

const url = "http://www.acadia-info.com/";

const scrapeAll = async (browserInstance) => {
    let browser;

    try {
        let timeAtStart = Date.now();
        let fileName = 'acadia-scrapping';

        browser = await browserInstance;
        
        await api.connect(browser, 'http://www.acadia-info.com/connexion?back=my-account');


        // Catégorie Ordinateurs
        const pcPortable = await pageScraper.scraper(browser, 'http://www.acadia-info.com/4-PCPORTABLE', true);
        await fs.writeFile('./assets/ordinateurs/pc_portable.json', JSON.stringify(pcPortable), 'utf-8', (err) => { if (err) return console.log(err); });

        const pcBureau = await pageScraper.scraper(browser, 'http://www.acadia-info.com/5-PCDEBUREAU', true);
        await fs.writeFile('./assets/ordinateurs/pc_bureau.json', JSON.stringify(pcBureau), 'utf-8', (err) => { if (err) return console.log(err); });

        const software = await pageScraper.scraper(browser, 'http://www.acadia-info.com/10-LOGICIEL', true);
        await fs.writeFile('./assets/ordinateurs/software.json', JSON.stringify(software), 'utf-8', (err) => { if (err) return console.log(err); });

        const chargeur = await pageScraper.scraper(browser, 'http://www.acadia-info.com/14-CHARGEUR', true);
        await fs.writeFile('./assets/ordinateurs/chargeur.json', JSON.stringify(chargeur), 'utf-8', (err) => { if (err) return console.log(err); });

        const allInOne = await pageScraper.scraper(browser, 'http://www.acadia-info.com/9-PCTOUTENUN', true);
        await fs.writeFile('./assets/ordinateurs/allInOne.json', JSON.stringify(allInOne), 'utf-8', (err) => { if (err) return console.log(err); });



        // Catégorie Composants

        const motherBoard = await pageScraper.scraper(browser, 'http://www.acadia-info.com/17-CARTEMERE', true);
        await fs.writeFile('./assets/composants/motherboard.json', JSON.stringify(motherBoard), 'utf-8', (err) => { if (err) return console.log(err); });

        const boitier = await pageScraper.scraper(browser, 'http://www.acadia-info.com/33-BOITIER', true);
        await fs.writeFile('./assets/composants/boitier.json', JSON.stringify(boitier), 'utf-8', (err) => { if (err) return console.log(err); });

        const controller = await pageScraper.scraper(browser, 'http://www.acadia-info.com/54-CONTROLEUR', false);
        await fs.writeFile('./assets/composants/controller.json', JSON.stringify(controller), 'utf-8', (err) => { if (err) return console.log(err); });

        const alim = await pageScraper.scraper(browser, 'http://www.acadia-info.com/37-ALIMENTATION', true);
        await fs.writeFile('./assets/composants/alim.json', JSON.stringify(alim), 'utf-8', (err) => { if (err) return console.log(err); });

        const gpu = await pageScraper.scraper(browser, 'http://www.acadia-info.com/21-CARTEGRAPHIQUE', true);
        await fs.writeFile('./assets/composants/gpu.json', JSON.stringify(gpu), 'utf-8', (err) => { if (err) return console.log(err); });

        const cpu = await pageScraper.scraper(browser, 'http://www.acadia-info.com/25-PROCESSEUR', true);
        await fs.writeFile('./assets/composants/cpu.json', JSON.stringify(cpu), 'utf-8', (err) => { if (err) return console.log(err); });

        const cooling = await pageScraper.scraper(browser, 'http://www.acadia-info.com/41-systeme-de-refroidissement', true);
        await fs.writeFile('./assets/composants/cooling.json', JSON.stringify(cooling), 'utf-8', (err) => { if (err) return console.log(err); });

        const server = await pageScraper.scraper(browser, 'http://www.acadia-info.com/55-SERVEUR', false);
        await fs.writeFile('./assets/composants/server.json', JSON.stringify(server), 'utf-8', (err) => { if (err) return console.log(err); });

        const opticReader = await pageScraper.scraper(browser, 'http://www.acadia-info.com/46-LECTEUROPTIQUE', false);
        await fs.writeFile('./assets/composants/opticReader.json', JSON.stringify(opticReader), 'utf-8', (err) => { if (err) return console.log(err); });

        const hdd = await pageScraper.scraper(browser, 'http://www.acadia-info.com/28-DISQUEDUR', true);
        await fs.writeFile('./assets/composants/hdd.json', JSON.stringify(hdd), 'utf-8', (err) => { if (err) return console.log(err); });

        const ram = await pageScraper.scraper(browser, 'http://www.acadia-info.com/32-MEMOIRE', true);
        await fs.writeFile('./assets/composants/ram.json', JSON.stringify(ram), 'utf-8', (err) => { if (err) return console.log(err); });

        const cardReader = await pageScraper.scraper(browser, 'http://www.acadia-info.com/49-LECTEURDECARTE', false);
        await fs.writeFile('./assets/composants/cardReader.json', JSON.stringify(cardReader), 'utf-8', (err) => { if (err) return console.log(err); });


        // Catégorie Périphérique

        const keyboard = await pageScraper.scraper(browser, 'http://www.acadia-info.com/58-CLAVIER', true);
        await fs.writeFile('./assets/peripheriques/keyboard.json', JSON.stringify(keyboard), 'utf-8', (err) => { if (err) return console.log(err); });

        const onduleur = await pageScraper.scraper(browser, 'http://www.acadia-info.com/69-ONDULEUR', true);
        await fs.writeFile('./assets/peripheriques/onduleur.json', JSON.stringify(onduleur), 'utf-8', (err) => { if (err) return console.log(err); });

        const scanner = await pageScraper.scraper(browser, 'http://www.acadia-info.com/72-SCANNER', false);
        await fs.writeFile('./assets/peripheriques/scanner.json', JSON.stringify(scanner), 'utf-8', (err) => { if (err) return console.log(err); });

        const mouse = await pageScraper.scraper(browser, 'http://www.acadia-info.com/61-SOURIS', true);
        await fs.writeFile('./assets/peripheriques/mouse.json', JSON.stringify(mouse), 'utf-8', (err) => { if (err) return console.log(err); });

        const printer = await pageScraper.scraper(browser, 'http://www.acadia-info.com/62-IMPRIMANTE', true);
        await fs.writeFile('./assets/peripheriques/printer.json', JSON.stringify(printer), 'utf-8', (err) => { if (err) return console.log(err); });

        const gamepad = await pageScraper.scraper(browser, 'http://www.acadia-info.com/74-GAMEPADS', false);
        await fs.writeFile('./assets/peripheriques/gamepad.json', JSON.stringify(gamepad), 'utf-8', (err) => { if (err) return console.log(err); });

        const consommable = await pageScraper.scraper(browser, 'http://www.acadia-info.com/66-CONSOMMABLE', true);
        await fs.writeFile('./assets/peripheriques/consommable.json', JSON.stringify(consommable), 'utf-8', (err) => { if (err) return console.log(err); });

        const externalCase = await pageScraper.scraper(browser, 'http://www.acadia-info.com/67-BOITIEREXTERNE', false);
        await fs.writeFile('./assets/peripheriques/externalCase.json', JSON.stringify(externalCase), 'utf-8', (err) => { if (err) return console.log(err); });

        const microphone = await pageScraper.scraper(browser, 'http://www.acadia-info.com/130-MICROPHONE', false);
        await fs.writeFile('./assets/peripheriques/microphone.json', JSON.stringify(microphone), 'utf-8', (err) => { if (err) return console.log(err); });


        // Catégorie Image & Sons

        const monitor = await pageScraper.scraper(browser, 'http://www.acadia-info.com/76-MONITEUR', true);
        await fs.writeFile('./assets/images_son/monitor.json', JSON.stringify(monitor), 'utf-8', (err) => { if (err) return console.log(err); });

        const headset = await pageScraper.scraper(browser, 'http://www.acadia-info.com/77-CASQUE', true);
        await fs.writeFile('./assets/images_son/headset.json', JSON.stringify(headset), 'utf-8', (err) => { if (err) return console.log(err); });

        const speaker = await pageScraper.scraper(browser, 'http://www.acadia-info.com/80-HAUTPARLEUR', false);
        await fs.writeFile('./assets/images_son/speaker.json', JSON.stringify(speaker), 'utf-8', (err) => { if (err) return console.log(err); });

        const camera = await pageScraper.scraper(browser, 'http://www.acadia-info.com/83-CAMERA', false);
        await fs.writeFile('./assets/images_son/camera.json', JSON.stringify(camera), 'utf-8', (err) => { if (err) return console.log(err); });

        const projector = await pageScraper.scraper(browser, 'http://www.acadia-info.com/86-VIDEOPROJECTEUR', true);
        await fs.writeFile('./assets/images_son/projector.json', JSON.stringify(projector), 'utf-8', (err) => { if (err) return console.log(err); });


        // Catégorie Réseau

        const nas = await pageScraper.scraper(browser, 'http://www.acadia-info.com/88-NAS', true);
        await fs.writeFile('./assets/reseaux/nas.json', JSON.stringify(nas), 'utf-8', (err) => { if (err) return console.log(err); });

        const router = await pageScraper.scraper(browser, 'http://www.acadia-info.com/89-ROUTEUR', true);
        await fs.writeFile('./assets/reseaux/router.json', JSON.stringify(router), 'utf-8', (err) => { if (err) return console.log(err); });

        const switchs = await pageScraper.scraper(browser, 'http://www.acadia-info.com/90-SWITCH', true);
        await fs.writeFile('./assets/reseaux/switchs.json', JSON.stringify(switchs), 'utf-8', (err) => { if (err) return console.log(err); });

        const cpl = await pageScraper.scraper(browser, 'http://www.acadia-info.com/91-CPL', true);
        await fs.writeFile('./assets/reseaux/cpl.json', JSON.stringify(cpl), 'utf-8', (err) => { if (err) return console.log(err); });

        const repeteur = await pageScraper.scraper(browser, 'http://www.acadia-info.com/92-REPETITEURWIFI', false);
        await fs.writeFile('./assets/reseaux/repeteur.json', JSON.stringify(repeteur), 'utf-8', (err) => { if (err) return console.log(err); });

        const adaptateurs = await pageScraper.scraper(browser, 'http://www.acadia-info.com/93-ADAPTATEURWIFI', true);
        await fs.writeFile('./assets/reseaux/adaptateurs.json', JSON.stringify(adaptateurs), 'utf-8', (err) => { if (err) return console.log(err); });


        // Catégorie Domotique

        const cameraIp = await pageScraper.scraper(browser, 'http://www.acadia-info.com/84-CAMERAIP', false);
        await fs.writeFile('./assets/domotique/cameraIp.json', JSON.stringify(cameraIp), 'utf-8', (err) => { if (err) return console.log(err); });

        const cameraAction = await pageScraper.scraper(browser, 'http://www.acadia-info.com/135-camera-action', false);
        await fs.writeFile('./assets/domotique/cameraAction.json', JSON.stringify(cameraAction), 'utf-8', (err) => { if (err) return console.log(err); });

        const capteur = await pageScraper.scraper(browser, 'http://www.acadia-info.com/133-CAPTEUR', false);
        await fs.writeFile('./assets/domotique/intrusion.json', JSON.stringify(capteur), 'utf-8', (err) => { if (err) return console.log(err); });

        const nvr = await pageScraper.scraper(browser, 'http://www.acadia-info.com/134-NVR', false);
        await fs.writeFile('./assets/domotique/nvr.json', JSON.stringify(nvr), 'utf-8', (err) => { if (err) return console.log(err); });


        // Catégorie Accessoires

        const sacoche = await pageScraper.scraper(browser, 'http://www.acadia-info.com/102-SACOCHE', true);
        await fs.writeFile('./assets/accessoires/sacoche.json', JSON.stringify(sacoche), 'utf-8', (err) => { if (err) return console.log(err); });

        const __accessoires = await pageScraper.scraper(browser, 'http://www.acadia-info.com/106-ACCESSOIRE', true);
        await fs.writeFile('./assets/accessoires/__accessoires.json', JSON.stringify(__accessoires), 'utf-8', (err) => { if (err) return console.log(err); });

        const rack = await pageScraper.scraper(browser, 'http://www.acadia-info.com/98-RACK', false);
        await fs.writeFile('./assets/accessoires/rack.json', JSON.stringify(rack), 'utf-8', (err) => { if (err) return console.log(err); });

        const supportCooling = await pageScraper.scraper(browser, 'http://www.acadia-info.com/101-support-refroidissement', false);
        await fs.writeFile('./assets/accessoires/supportCooling.json', JSON.stringify(supportCooling), 'utf-8', (err) => { if (err) return console.log(err); });

        const cable = await pageScraper.scraper(browser, 'http://www.acadia-info.com/105-CABLE', true);
        await fs.writeFile('./assets/accessoires/cable.json', JSON.stringify(cable), 'utf-8', (err) => { if (err) return console.log(err); });

        const chair = await pageScraper.scraper(browser, 'http://www.acadia-info.com/131-CHAISE', true);
        await fs.writeFile('./assets/accessoires/chair.json', JSON.stringify(chair), 'utf-8', (err) => { if (err) return console.log(err); });

        const tapisSouris = await pageScraper.scraper(browser, 'http://www.acadia-info.com/103-TAPISDESOURIS', true);
        await fs.writeFile('./assets/accessoires/tapisSouris.json', JSON.stringify(tapisSouris), 'utf-8', (err) => { if (err) return console.log(err); });

        let timeAtEnd = Date.now();

        const time = convert(timeAtEnd - timeAtStart);
  
        console.log(`Scrapping finished in ${time}`);
        
        // Require catégorie PC
        const json_pc_portable = require('../assets/ordinateurs/pc_portable.json');
        const json_pc_bureau = require('../assets/ordinateurs/pc_bureau.json');
        const json_software = require('../assets/ordinateurs/software.json');
        const json_chargeur = require('../assets/ordinateurs/chargeur.json');
        const json_allInOne = require('../assets/ordinateurs/allInOne.json');

        // Require catégorie Composants
        const json_motherboard = require('../assets/composants/motherboard.json');
        const json_boitier = require('../assets/composants/boitier.json');
        const json_controller = require('../assets/composants/controller.json');
        const json_alim = require('../assets/composants/alim.json');
        const json_gpu = require('../assets/composants/gpu.json');
        const json_cpu = require('../assets/composants/cpu.json');
        const json_cooling = require('../assets/composants/cooling.json');
        const json_server = require('../assets/composants/server.json');
        const json_opticReader = require('../assets/composants/opticReader.json');
        const json_hdd = require('../assets/composants/hdd.json');
        const json_ram = require('../assets/composants/ram.json');
        const json_card_reader = require('../assets/composants/cardReader.json');

        // Require catégorie Périphériques
        const json_keyboard = require('../assets/peripheriques/keyboard.json');
        const json_mouse = require('../assets/peripheriques/mouse.json');
        const json_onduleur = require('../assets/peripheriques/onduleur.json');
        const json_scanner = require('../assets/peripheriques/scanner.json');
        const json_printer = require('../assets/peripheriques/printer.json');
        const json_gamepad = require('../assets/peripheriques/gamepad.json');
        const json_consommable = require('../assets/peripheriques/consommable.json');
        const json_externalCase = require('../assets/peripheriques/externalCase.json');
        const json_microphone = require('../assets/peripheriques/microphone.json');

        // Require catégorie Image & Sons
        const json_monitor = require('../assets/images_son/monitor.json');
        const json_headset = require('../assets/images_son/headset.json');
        const json_speaker = require('../assets/images_son/speaker.json');
        const json_camera = require('../assets/images_son/camera.json');
        const json_projector = require('../assets/images_son/projector.json');

        // Require catégorie Réseaux
        const json_nas = require('../assets/reseaux/nas.json');
        const json_router = require('../assets/reseaux/router.json');
        const json_switchs = require('../assets/reseaux/switchs.json');
        const json_cpl = require('../assets/reseaux/cpl.json');
        const json_repeteur = require('../assets/reseaux/repeteur.json');
        const json_adaptateurs = require('../assets/reseaux/adaptateurs.json');

        // Require catégorie Domotique
        const json_cameraIp = require('../assets/domotique/cameraIp.json');
        const json_cameraAction = require('../assets/domotique/cameraAction.json');
        const json_intrusion = require('../assets/domotique/intrusion.json');
        const json_nvr = require('../assets/domotique/nvr.json');

        // Require catégorie Accessoires
        const json_chair = require('../assets/accessoires/chair.json');
        const json_rack = require('../assets/accessoires/rack.json');
        const json_tapisSouris = require('../assets/accessoires/tapisSouris.json');
        const json___accessoires = require('../assets/accessoires/__accessoires.json');
        const json_sacoche = require('../assets/accessoires/sacoche.json');
        const json_supportCooling = require('../assets/accessoires/supportCooling.json');
        const json_cable = require('../assets/accessoires/cable.json');

        const columns = [
            { label: 'Titre', value: 'title' },
            { label: 'EAN', value: 'ean' },
            { label: 'SKU', value: 'sku' },
            { label: 'Image', value: 'image' },
            { label: 'Description', value: 'description' },
            { label: 'Poid', value: 'weight' },
            { label: 'Stock', value: 'stock' },
            { label: 'HT Price', value: 'price' }
        ];

        const content = [ 
            ...json_pc_portable,
            ...json_pc_bureau,
            ...json_software,
            ...json_chargeur,
            ...json_allInOne,

            ...json_motherboard,
            ...json_boitier,
            ...json_controller,
            ...json_alim,
            ...json_gpu,
            ...json_cpu,
            ...json_cooling,
            ...json_server,
            ...json_opticReader,
            ...json_hdd,
            ...json_ram,
            ...json_card_reader,

            ...json_keyboard,
            ...json_mouse,
            ...json_onduleur,
            ...json_scanner,
            ...json_printer,
            ...json_gamepad,
            ...json_consommable,
            ...json_externalCase,
            ...json_microphone,

            ...json_monitor,
            ...json_headset,
            ...json_speaker,
            ...json_camera,
            ...json_projector,

            ...json_nas,
            ...json_router,
            ...json_switchs,
            ...json_cpl,
            ...json_repeteur,
            ...json_adaptateurs,

            ...json_cameraIp,
            ...json_cameraAction,
            ...json_intrusion,
            ...json_nvr,

            ...json_chair,
            ...json_rack,
            ...json_tapisSouris,
            ...json___accessoires,
            ...json_sacoche,
            ...json_supportCooling,
            ...json_cable
        ];

        const settings = {
            sheetName: 'Sheet',
            fileName: fileName,
            extraLength: 3,
            writeOptions: {}
        }

        const download = true;

        xlsx(columns, content, settings, download);
        
        console.log(`Data has been converted to .xlsx at './${fileName}.xlsx'`);

        browser.close();

    } catch (e) {
        console.log(e);
    }

    return browser;
}

module.exports = (browserInstance) => scrapeAll(browserInstance)