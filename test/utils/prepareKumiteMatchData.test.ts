import {describe, it, expect} from 'vitest';
import prepareKumiteMatchData from '../../utils/prepareKumiteMatchData';

describe('prepareKumiteMatchData', () => {
    it('should prepare match data correctly for 2 participants', () => {
        const participants = [
            {
                expand: {
                    athletes: [{id: '1', name: 'Athlete 1'}],
                    team: {collectionId: 'team1', id: '1', avatar: 'avatar1'}
                }
            },
            {
                expand: {
                    athletes: [{id: '2', name: 'Athlete 2'}],
                    team: {collectionId: 'team2', id: '2', avatar: 'avatar2'}
                }
            }
        ];

        const result = prepareKumiteMatchData(participants);

        expect(result.round).toEqual([{name: 'Final', roundIndex: 0}]);
        expect(result.match.length).toBe(1);
        expect(result.match[0].sides.length).toBe(2);
        expect(result.contestant['1'].player.title).toBe('Athlete 1');
        expect(result.contestant['2'].player.title).toBe('Athlete 2');
    });

    it('should prepare match data correctly for 4 participants', () => {
        const participants = [
            {
                expand: {
                    athletes: [{id: '1', name: 'Athlete 1'}],
                    team: {collectionId: 'team1', id: '1', avatar: 'avatar1'}
                }
            },
            {
                expand: {
                    athletes: [{id: '2', name: 'Athlete 2'}],
                    team: {collectionId: 'team2', id: '2', avatar: 'avatar2'}
                }
            },
            {
                expand: {
                    athletes: [{id: '3', name: 'Athlete 3'}],
                    team: {collectionId: 'team3', id: '3', avatar: 'avatar3'}
                }
            },
            {
                expand: {
                    athletes: [{id: '4', name: 'Athlete 4'}],
                    team: {collectionId: 'team4', id: '4', avatar: 'avatar4'}
                }
            }
        ];

        const result = prepareKumiteMatchData(participants);

        expect(result.round).toEqual([
            {name: 'Semifinal', roundIndex: 0},
            {name: 'Final', roundIndex: 1}
        ]);
        expect(result.match.length).toBe(2);
        expect(result.match[0].sides.length).toBe(2);
        expect(result.match[1].sides.length).toBe(2);
    });

    it('should prepare match data correctly for 8 participants', () => {
        const participants = Array.from({length: 8}, (_, i) => ({
            expand: {
                athletes: [{id: `${i + 1}`, name: `Athlete ${i + 1}`}],
                team: {collectionId: `team${i + 1}`, id: `${i + 1}`, avatar: `avatar${i + 1}`}
            }
        }));

        const result = prepareKumiteMatchData(participants);

        expect(result.round).toEqual([
            {name: 'Perempat Final', roundIndex: 0},
            {name: 'Semifinal', roundIndex: 1},
            {name: 'Final', roundIndex: 2}
        ]);
        expect(result.match.length).toBe(4);
        expect(result.match[0].sides.length).toBe(2);
    });

    it('should prepare match data correctly for 16 participants', () => {
        const participants = Array.from({length: 16}, (_, i) => ({
            expand: {
                athletes: [{id: `${i + 1}`, name: `Athlete ${i + 1}`}],
                team: {collectionId: `team${i + 1}`, id: `${i + 1}`, avatar: `avatar${i + 1}`}
            }
        }));

        const result = prepareKumiteMatchData(participants);

        expect(result.round).toEqual([
            {name: '16 Besar', roundIndex: 0},
            {name: 'Perempat Final', roundIndex: 1},
            {name: 'Semifinal', roundIndex: 2},
            {name: 'Final', roundIndex: 3}
        ]);
        expect(result.match.length).toBe(8);
        expect(result.match[0].sides.length).toBe(2);
    });

    it('should prepare match data correctly for 32 participants', () => {
        const participants = Array.from({length: 32}, (_, i) => ({
            expand: {
                athletes: [{id: `${i + 1}`, name: `Athlete ${i + 1}`}],
                team: {collectionId: `team${i + 1}`, id: `${i + 1}`, avatar: `avatar${i + 1}`}
            }
        }));

        const result = prepareKumiteMatchData(participants);

        expect(result.round).toEqual([
            {name: '32 Besar', roundIndex: 0},
            {name: '16 Besar', roundIndex: 1},
            {name: 'Perempat Final', roundIndex: 2},
            {name: 'Semifinal', roundIndex: 3},
            {name: 'Final', roundIndex: 4}
        ]);
        expect(result.match.length).toBe(16);
        expect(result.match[0].sides.length).toBe(2);
    });

    it('should handle missing avatar correctly', () => {
        const participants = [
            {
                expand: {
                    athletes: [{id: '1', name: 'Athlete 1'}],
                    team: {collectionId: 'team1', id: '1', avatar: 'avatar1'}
                }
            },
            {
                expand: {
                    athletes: [{id: '2', name: 'Athlete 2'}],
                    team: {collectionId: 'team2', id: '2', avatar: null}
                }
            },
            {
                expand: {
                    athletes: [{id: '3', name: 'Athlete 3'}],
                    team: {collectionId: 'team3', id: '3', avatar: ''}
                }
            }
        ];

        const result = prepareKumiteMatchData(participants);


        expect(result.contestant['1'].player.nationality).toBe('/api/files/team1/1/avatar1');
        expect(result.contestant['2'].player.nationality).toBe('/tumwuh-leaf.png');
        expect(result.contestant['3'].player.nationality).toBe('/tumwuh-leaf.png');
    });
});