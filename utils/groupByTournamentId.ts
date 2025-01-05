import * as R from 'ramda';

export default function groupByTournamentId(data: any[]) {
    return R.groupBy(
        // @ts-ignore
        R.prop('tournament')
    )(data);
}