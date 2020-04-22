/**
 * This file is part of the ALICE Electronic Logbook v2, also known as Jiskefet.
 * Copyright (C) 2020  Stichting Hogeschool van Amsterdam
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const { server: { GetServerInformationUseCase } } = require('../../../../lib/application/usecases');
const chai = require('chai');

const { expect } = chai;

module.exports = () => {
    it('should return an object that has the `version` property', async () => {
        // Arrange
        const usecase = new GetServerInformationUseCase();

        // Act
        const result = await usecase.execute();

        // Assert
        expect(result).to.have.ownProperty('version');
    });

    it('should return an object that has the `name` property', async () => {
        // Arrange
        const usecase = new GetServerInformationUseCase();

        // Act
        const result = await usecase.execute();

        // Assert
        expect(result).to.have.ownProperty('name');
    });
};
