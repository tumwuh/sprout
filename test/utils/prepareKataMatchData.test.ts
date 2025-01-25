import {describe, it, expect} from 'vitest';
import prepareKataMatchData from '../../utils/prepareKataMatchData';
import {faker} from '@faker-js/faker';

const generateRandomData = (length: number) => {
    const data = [];
    for (let i = 0; i < length; i++) {
        data.push({
            athletes: [1, 2, 3].map(() => faker.string.alpha(12)),
            category: faker.string.alpha(12),
            created: '2025-01-13 14:55:38.104Z',
            id: 'tjxybye6wy79b6k',
            registration: 'xuf6pla6xe8rddl',
            team: 'rdnjb14sghwr8um',
            tournament: 'xspd10uk5uc5y3a',
            updated: '2025-01-13 14:55:38.104Z',
        });
    }
    return data;
};

describe('prepareKataMatchData', () => {
    it('should prepare match data correctly with default personPerGroup', () => {
        try {
            const data = generateRandomData(13);
            const category = faker.string.alpha(12);
            const tournament = faker.string.alpha(12);

            const result = prepareKataMatchData(data, category, tournament);


            expect(result.firstRound).toEqual({
                name: 'Putaran Pertama',
                category: category,
            });

            expect(result.contestant.length).toBe(data.length);
            expect(result.match.length).toBe(Math.ceil(data.length / 5));
            expect(result.match[0].contestants.length).toBe(5);
            expect(result.match[1].contestants.length).toBe(5);
            expect(result.match[2].contestants.length).toBe(3);
        } catch (error) {
            console.error('Test failed with error:', error);
            throw error; // Re-throw the error to ensure the test fails
        }
    });

    it('should prepare match data correctly with custom personPerGroup', () => {
        const data = generateRandomData(15);
        const category = faker.string.alpha(12);
        const tournament = faker.string.alpha(12);
        const personPerGroup = 3;

        const result = prepareKataMatchData(data, category, tournament, personPerGroup);


        expect(result.firstRound).toEqual({
            name: 'Putaran Pertama',
            category: category,
        });

        expect(result.contestant.length).toBe(data.length);
        expect(result.match.length).toBe(Math.ceil(data.length / personPerGroup));
        expect(result.match[0].contestants.length).toBe(3);
        expect(result.match[1].contestants.length).toBe(3);
        expect(result.match[2].contestants.length).toBe(3);
        expect(result.match[3].contestants.length).toBe(3);
        expect(result.match[4].contestants.length).toBe(3);

    });
});