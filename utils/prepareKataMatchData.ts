import {sort} from 'ramda';
const shuffleArray = <T>(array: T[]): T[] => {
    return sort(() => Math.random() - 0.5, array);
};

export default function prepareKataMatchData(data: {[key:string]: any}[], category: string, tournament: string, personPerGroup: number = 5) {
    // First Round
    const firstRound = {
        name: 'Putaran Pertama',
        category: category
    }

    // All contestants
    const contestant = shuffleArray(data.map((participant: {[key:string]: any}) => ({
        category,
        athletes: participant.athletes,
        score: {
            jury1: null,
            jury2: null,
            jury3: null,
            jury4: null,
            jury5: null,
            jury6: null,
            jury7: null,
        },
        secondScore: {
            jury1: null,
            jury2: null,
            jury3: null,
            jury4: null,
            jury5: null,
            jury6: null,
            jury7: null,
        },
        isGold: false,
        isSilver: false,
        isBronze: false,
    })))

    // Generate match
    const match = Array.from({ length: Math.ceil(contestant.length / personPerGroup) }, (_, index) => ({
        name: `Pertandingan ${index + 1}`,
        tournament,
        category,
        contestants: contestant.slice(index * personPerGroup, (index + 1) * personPerGroup)
    }))


    return {
        firstRound,
        contestant,
        match
    }
}