/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { getCoordValue, switchPlayer, setToMap } from '../../../store';
import { useActionMap } from '../../../lib';
import { player } from '../../../types/app';
import { withHashed } from '../../KeyboardContol/KeybordControl';
import { CrossIcon } from './CrossIcon';
import { ZeroIcon } from './ZeroIcon';

import './styles.scss';


const Icons: {[key in player]: React.FunctionComponent } = {
  [player.CROSS]: CrossIcon,
  [player.ZEROS]: ZeroIcon
};

export interface CellProps {
  coord: string
}

const Cell = forwardRef<HTMLDivElement, CellProps>(function Cell({ coord }, ref) {
  const actions = useActionMap({
    setToMap,
    switchPlayer
  });

  const marker: player = useSelector(getCoordValue(coord));

  const onClickHandler = useCallback(() => {
    if (marker != null) {
      return;
    }

    actions.setToMap(coord);
    actions.switchPlayer();
  }, [marker]);

  const Icon = Icons[marker] || (() => null);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="cell" ref={ref} tabIndex={-1} onClick={onClickHandler}>
      <Icon />
    </div>
  );
});

const wrappedCell = withHashed(Cell);

export { wrappedCell as Cell };
