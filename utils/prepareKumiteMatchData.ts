export default function prepareKumiteMatchData(participant: {[key: string]: any}[]) {
    const config = useRuntimeConfig().public

    const roundRule = {
        2: {
            round: [{
                name: 'Final',
                roundIndex: 0
            }],
        },
        4: {
            round: [{
                name: 'Semifinal',
                roundIndex: 0
            }, {
                name: 'Final',
                roundIndex: 1
            }]
        },
        8: {
            round: [{
                name: 'Perempat Final',
                roundIndex: 0
            }, {
                name: 'Semifinal',
                roundIndex: 1
            }, {
                name: 'Final',
                roundIndex: 2
            }]
        },
        16: {
            round: [{
                name: '16 Besar',
                roundIndex: 0
            }, {
                name: 'Perempat Final',
                roundIndex: 1
            }, {
                name: 'Semifinal',
                roundIndex: 2
            }, {
                name: 'Final',
                roundIndex: 3
            }]
        },
        32: {
            round: [{
                name: '32 Besar',
                roundIndex: 0
            }, {
                name: '16 Besar',
                roundIndex: 1
            }, {
                name: 'Perempat Final',
                roundIndex: 2
            }, {
                name: 'Semifinal',
                roundIndex: 3
            }, {
                name: 'Final',
                roundIndex: 4
            }]
        },
        64: {
            round: [{
                name: '64 Besar',
                roundIndex: 0
            }, {
                name: '32 Besar',
                roundIndex: 1
            }, {
                name: '16 Besar',
                roundIndex: 2
            }, {
                name: 'Perempat Final',
                roundIndex: 3
            }, {
                name: 'Semifinal',
                roundIndex: 4
            }, {
                name: 'Final',
                roundIndex: 5
            }]
        }
    }
    let round
    if (participant.length <= 2) {
        round = roundRule[2].round
    } else if (participant.length <= 4) {
        round = roundRule[4].round
    } else if (participant.length <= 8) {
        round = roundRule[8].round
    } else if (participant.length <= 16) {
        round = roundRule[16].round
    } else if (participant.length <= 32) {
        round = roundRule[32].round
    } else {
        round = roundRule[64].round
    }
    const match = []
    let copyOfParticipant = [...participant]
    while (copyOfParticipant.length > 0) {
        const contestants = copyOfParticipant.splice(0, 2)
        match.push({
            roundIndex: 0,
            order: match.length,
            sides: contestants.map((contestant, index) => ({
                contestantId: contestant.expand.athletes[0].id,
                currentScore: 0,
                isWinner: false,
            })),
        })
    }


    const contestant: {[key: string]: any} = {}
    const handleMissingAvatar = (participant: {[key: string]: any}) => {
        if (!participant.expand.team.avatar || participant.expand.team.avatar === '') {
            return  '/tumwuh-leaf.png'
        }

        return config.baseApiUrl + '/api/files/' + `${participant.expand.team.collectionId}/${participant.expand.team.id}/${participant.expand.team.avatar}`
    }
    participant.forEach((participant) => {
        contestant[participant.expand.athletes[0].id] = {
            player: {
                title: participant.expand.athletes[0].name,
                nationality: handleMissingAvatar(participant),
            }
        }
    })

    return {
        round,
        match,
        contestant
    }



}