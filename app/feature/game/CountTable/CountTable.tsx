import React, { useEffect } from 'react';
import { countModule, gameModule, incrementWinCount } from '../../../store';
import { useActionMap, useSelectorMap } from '../../../lib/hooks/hooks';
import { CountTableItem } from './CountTableItem';
import './styles.scss';
import { State, player } from '../../../types/app';

export const CountTable: React.FC = () => {
  const {
    winner,
    counts
  } = useSelectorMap({
    counts: (state: State) => [
      {
        count: countModule.get[player.CROSS](state),
        type: player.CROSS
      },
      {
        count: countModule.get[player.ZEROS](state),
        type: player.ZEROS
      }
    ],
    winner: gameModule.get.winner
  });

  const { incrementWins } = useActionMap({
    incrementWins: incrementWinCount
  });

  useEffect(incrementWins, [winner]);

  return (
    <div className="count-table">
      {counts.map(({ count, type }: { count: number, type: player }) => <CountTableItem title={type} count={count} key={type} />)}
    </div>
  );
};
