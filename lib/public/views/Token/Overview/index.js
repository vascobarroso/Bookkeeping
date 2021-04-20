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

import { h } from '/js/src/index.js';

/**
 * Table row header
 * @param {object} model Pass the model to access the defined functions
 * @return {vnode} Return the view of the table with the filtering options
 */
const tokenOverview = (model) => {

    return h('div#create-log', [
        h('', [
            h('h2', 'JWT token overview'),

            h('label.form-check-label.f4.mt2', 'Copy the JWT token'),

            h('button.shadow-level1.btn.btn-success.mt2#send', {
                onclick: () => model.execCommand("copy"),
            }, 'Copy to clipboard'),
        ]),
    ]);
};

export default (model) => [tokenOverview(model)];
