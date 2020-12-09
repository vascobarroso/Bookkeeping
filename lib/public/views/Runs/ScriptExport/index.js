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
import errorAlert from '../../../components/common/errorAlert.js';
import activeColumns from '../ActiveColumns/index.js';

/**
 * A function to construct the exports runs screen
 * @param {object} model Pass the model to access the defined functions
 * @return {vnode} Return the view of the inputs
 */
const exportRunsScriptScreen = (model) => {
    const runNumbers = model.runs.getSelectedRunNumbers();
    const runsFields = Object.keys(activeColumns());
    const selectedRunsFields = model.runs.getSelectedRunsFields;
    const exportTypes = ['JSON', 'CSV'];
    const selectedExportType = model.runs.getSelectedExportType;
    const data = model.runs.getRuns();
    const disabled = data.isLoading();

    return h('div#export-runs', [
        data.isFailure() && data.payload.map(errorAlert),

        h('', {
            onremove: () => model.logs.clearAllEditors(),
        }, [
            h('h2', 'Export Script'),
            h('textarea#text.form-control', {
                placeholder: 'Your message...',
                oninput: (e) => model.runs.setSelectedRunNumbers(e.target.value),
            },),

            h('button.shadow-level1.btn.btn-success.mt2#send', {
                onclick: async () => {
                    const filteredRuns = await model.runs.getFilteredRuns(data.payload);
                    await model.runs.createRunsExport(filteredRuns, 'runs');
                },
            }, data.isLoading() ? 'Exporting...' : 'Export'),
        ]),
    ]);
};

export default (model) => exportRunsScriptScreen(model);
