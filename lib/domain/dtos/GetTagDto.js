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

const Joi = require('joi');
const EntityIdDto = require('./EntityIdDto');
const PaginationDto = require('./PaginationDto');

const ParamsDto = Joi.object({
    tagId: EntityIdDto,
});

const SortDto = Joi.object({
    id: Joi.string().valid('asc', 'desc'),
    title: Joi.string().valid('asc', 'desc'),
    author: Joi.string().valid('asc', 'desc'),
    createdAt: Joi.string().valid('asc', 'desc'),
    tags: Joi.string().valid('asc', 'desc'),
    runs: Joi.string().valid('asc', 'desc'),
}).xor('id', 'title', 'author', 'createdAt', 'tags', 'runs');

const QueryDto = Joi.object({
    page: PaginationDto,
    sort: SortDto,
    token: Joi.string(),
});

const GetLogDto = Joi.object({
    body: Joi.object({}),
    params: ParamsDto,
    query: QueryDto,
});

module.exports = GetLogDto;
