import { describe, it, expect } from 'vitest';
import groupByTournamentId from "~/utils/groupByTournamentId";

describe('groupByTournamentId', () => {
  it('should group data by tournament id', () => {
    const data = [
      { tournament: '1', name: 'Team A' },
      { tournament: '1', name: 'Team B' },
      { tournament: '2', name: 'Team C' },
    ];

    const expectedOutput = {
      '1': [
        { tournament: '1', name: 'Team A' },
        { tournament: '1', name: 'Team B' },
      ],
      '2': [{ tournament: '2', name: 'Team C' }],
    };

    expect(groupByTournamentId(data)).toEqual(expectedOutput);
  });

  it('should return an empty object if data is empty', () => {
    const data: any[] = [];
    const expectedOutput = {};

    expect(groupByTournamentId(data)).toEqual(expectedOutput);
  });

  it('should handle data with no tournament property', () => {
    const data = [
      { name: 'Team A' },
      { tournament: '1', name: 'Team B' },
    ];

    const expectedOutput = {
      'undefined': [{ name: 'Team A' }],
      '1': [{ tournament: '1', name: 'Team B' }],
    };

    expect(groupByTournamentId(data)).toEqual(expectedOutput);
  });
});