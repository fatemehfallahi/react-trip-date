import * as React from 'react';

import { HeaderStyle } from '../index.styles';

import ChevronRight from '../../assets/images/chevron-right.svg';
import ChevronLeft from '../../assets/images/chevron-left.svg';
import Context from '../context/Context';

export const Header = () => {
  let {
    source,
    setSource,
    displayMonths,
    jalali,
    numberOfMonths,
    setDisplayMonths,
    headerTextColor,
    buttonSize,
    RightButtonComponent,
    LeftButtonComponent,
  } = React.useContext(Context);

  const nextMonth = () => {
    if (displayMonths) {
      setSource(source.add(1, 'year'));
    } else {
      setSource(source.add(1, 'month'));
    }
  };

  const prevMonth = () => {
    if (displayMonths) {
      setSource(source.subtract(1, 'year'));
    } else {
      setSource(source.subtract(1, 'month'));
    }
  };

  React.useEffect(() => {}, [displayMonths]);

  const titleMonth = () => {
    let titles = [];
    for (let i = 0; i < numberOfMonths; i++) {
      if (source.get('day') === 0) {
        source = source.add(1, 'day');
      }
      titles.push(
        <p key={Math.random()} onClick={() => setDisplayMonths(true)}>
          {source.add(i, 'month').format('YYYY-MMMM')}
        </p>,
      );
    }
    return titles;
  };

  return (
    <HeaderStyle
      numberOfMonths={numberOfMonths}
      jalali={jalali}
      buttonSize={buttonSize}
      headerTextColor={headerTextColor}
    >
      <div className="action" onClick={prevMonth}>
        {RightButtonComponent ? (
          <RightButtonComponent />
        ) : (
          <ChevronRight className={'prev-month'} />
        )}
        {displayMonths ? (
          RightButtonComponent ? (
            <RightButtonComponent />
          ) : (
            <ChevronRight className={'prev-month'} />
          )
        ) : null}
      </div>
      {titleMonth()}
      <div className="action" onClick={nextMonth}>
        {LeftButtonComponent ? (
          <LeftButtonComponent />
        ) : (
          <ChevronLeft className={'next-month'} />
        )}
        {displayMonths ? (
          LeftButtonComponent ? (
            <LeftButtonComponent />
          ) : (
            <ChevronLeft className={'next-month'} />
          )
        ) : null}
      </div>
    </HeaderStyle>
  );
};
