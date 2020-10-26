/**
 * @license
 * Copyright CERN and copyright holders of ALICE O2. This software is
 * distributed under the terms of the GNU General Public License v3 (GPL
 * Version 3), copied verbatim in the file "COPYING".
 *
 * See http://alice-o2.web.cern.ch/license for full licensing information.
 *
 * In applying this license CERN does not waive the privileges and immunities
 * granted to it by virtue of its status as an Intergovernmental Organization
 * or submit itself to any jurisdiction.
 */

const chai = require('chai');
const puppeteer = require('puppeteer');
const pti = require('puppeteer-to-istanbul');
const { server } = require('../../../lib/application');

const { expect } = chai;

/**
 * Special method built due to Puppeteer limitations: looks for the first row matching an ID in a table
 * @param {Object} table An HTML element representing the entire run table
 * @param {Object} page An object representing the browser page being used by Puppeteer
 * @return {String} The ID of the first matching row with data
 */
async function getFirstRow(table, page) {
    for (const child of table) {
        const id = await page.evaluate((element) => element.id, child);
        if (id.startsWith('row')) {
            return id;
        }
    }
}

module.exports = () => {
    let page;
    let browser;
    let url;

    let table;
    let firstRowId;

    const MAX_ATTACHMENTS_WITHOUT_DROPDOWN = 5;
    const MAX_MENUITEM_TEXT_LENGTH = 50;

    before(async () => {
        browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        page = await browser.newPage();
        await Promise.all([
            page.coverage.startJSCoverage({ resetOnNavigation: false }),
            page.coverage.startCSSCoverage(),
        ]);

        const { port } = server.address();
        url = `http://localhost:${port}`;
    });

    after(async () => {
        const [jsCoverage, cssCoverage] = await Promise.all([
            page.coverage.stopJSCoverage(),
            page.coverage.stopCSSCoverage(),
        ]);

        pti.write([...jsCoverage, ...cssCoverage].filter(({ url = '' } = {}) => url.match(/\.(js|css)$/)), {
            includeHostname: false,
            storagePath: './.nyc_output/lib/public',
        });
        await browser.close();
    });

    it('run detail loads correctly', async () => {
        await page.goto(`${url}/?page=run-detail&id=1`);
        await page.waitFor(100);

        const postExists = await page.$('h2');
        expect(Boolean(postExists)).to.be.true;

        const title = await page.evaluate((element) => element.innerText, postExists);
        expect(title).to.equal('Run #1');
    });

    it('can navigate to the log panel', async () => {
        await page.click('#logs-tab');
        await page.waitFor(100);
        const redirectedUrl = await page.url();
        expect(String(redirectedUrl).startsWith(`${url}/?page=run-detail&id=1&panel=logs`)).to.be.true;
    });

    it('can navigate to the main panel', async () => {
        await page.click('#main-tab');
        await page.waitFor(100);
        const redirectedUrl = await page.url();
        expect(String(redirectedUrl).startsWith(`${url}/?page=run-detail&id=1&panel=main`)).to.be.true;
    });

    it('can navigate to the log panel', async () => {
        await page.click('#logs-tab');
        await page.waitFor(100);
        const redirectedUrl = await page.url();
        expect(String(redirectedUrl).startsWith(`${url}/?page=run-detail&id=1&panel=logs`)).to.be.true;
    });

    it('can navigate to a log detail page', async () => {
        table = await page.$$('tr');
        firstRowId = await getFirstRow(table, page);

        // We expect the entry page to have the same id as the id from the run overview
        await page.click(`#${firstRowId}`);
        await page.waitFor(100);
        const redirectedUrl = await page.url();
        expect(String(redirectedUrl).startsWith(`${url}/?page=log-detail&id=1`)).to.be.true;
    });

    it('notifies if a specified run id is invalid', async () => {
        // Navigate to a run detail view with an id that cannot exist
        await page.goto(`${url}/?page=run-detail&id=abc`);
        await page.waitFor(100);

        // We expect there to be an error message
        const error = await page.$('.alert');
        expect(Boolean(error)).to.be.true;
        const message = await page.evaluate((element) => element.innerText, error);
        expect(message).to.equal('Invalid Attribute: "params.runId" must be a number');
    });

    it('notifies if a specified run id is not found', async () => {
        // Navigate to a run detail view with an id that cannot exist
        await page.goto(`${url}/?page=run-detail&id=999`);
        await page.waitFor(100);

        // We expect there to be an error message
        const error = await page.$('.alert');
        expect(Boolean(error)).to.be.true;
        const message = await page.evaluate((element) => element.innerText, error);
        expect(message).to.equal('Run with this id (999) could not be found');
    });

    it('can return to the overview page if an error occurred', async () => {
        // We expect there to be a button to return to the overview page
        const returnButton = await page.$('.btn-primary');
        const returnButtonText = await page.evaluate((element) => element.innerText, returnButton);
        expect(returnButtonText).to.equal('Return to Overview');

        // We expect the button to return the user to the overview page when pressed
        await returnButton.click();
        await page.waitFor(100);
        const redirectedUrl = await page.url();
        expect(String(redirectedUrl).startsWith(`${url}/?page=run-overview`)).to.be.true;
    });

    it('should display a simple list separated by ellipsis if a number of attachments is less than 5', async () => {
        const logId = 2;

        // Navigate to a log detail view
        await page.goto(`${url}/?page=log-detail&id=${logId}`);
        await page.waitFor(100);

        // Expect simple list of attachments to be shown
        const attachmentsTr = await page.$$(`#post${logId}-attachments td div div`);
        expect(attachmentsTr.length).lessThan(MAX_ATTACHMENTS_WITHOUT_DROPDOWN + 1);
    });

    it('should display a attachment\'s button if a number of attachments is more than 5', async () => {
        const logId = 4;

        // Navigate to a log detail view
        await page.goto(`${url}/?page=log-detail&id=${logId}`);
        await page.waitFor(100);

        // Expect simple list of attachments not to be shown
        const attachmentsTr = await page.$$(`#post${logId}-attachments td div div`);
        expect(Boolean(attachmentsTr.length)).to.be.false;

        // Expect attachment's button to be shown
        const attachmentsBtn = await page.$('#attachments-btn.flex-wrap.btn');

        expect(attachmentsBtn.length).to.be.ok;
        attachmentsBtn.click();

        await page.waitFor(100);

        // Expect attachments number is more than 5 in dropdown
        const attachments = await page.$$('div.attachments-dropdown div.dropdown-menu div.menu-item');
        expect(attachments.length).lessThan(MAX_ATTACHMENTS_WITHOUT_DROPDOWN);
    });

    it('should display a dropdown on click on attachment\'s button and hide on the second click', async () => {
        const logId = 4;

        // Navigate to a log detail view
        await page.goto(`${url}/?page=log-detail&id=${logId}`);
        await page.waitFor(100);

        // Open attachment's dropdown on click
        const attachmentsBtn = await page.$('#attachments-btn.flex-wrap.btn');
        attachmentsBtn.click();

        await page.waitFor(100);
        let attachmentsDropdown = await page.$('.dropdown-menu');
        expect(Boolean(attachmentsDropdown)).to.be(true);

        // Close attachment's dropdown on click
        attachmentsBtn.click();
        await page.waitFor(100);
        attachmentsDropdown = await page.$('.dropdown-menu');
        expect(Boolean(attachmentsDropdown)).to.be(false);
    });

    it('should truncate a text with ellipsis if text\' length is more than 50 letters', async () => {
        const logId = 3;

        // Navigate to a log detail view
        await page.goto(`${url}/?page=log-detail&id=${logId}`);
        await page.waitFor(100);

        // Expect attachment to be truncated with ellipsis
        const attachmentsTr = await page.$$(`#post${logId}-attachments td div div a.menu-item--truncated`);
        if (attachmentsTr.innerHTML.length > MAX_MENUITEM_TEXT_LENGTH) {
            expect(attachmentsTr.style.textOverflow === 'ellipsis').to.be.true;
        } else {
            expect(attachmentsTr.style.textOverflow === 'ellipsis').to.be.false;
        }
    });
};
