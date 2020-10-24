import React from 'react';
import './DateSeat.css';
import moment from 'moment';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
/* Custom weekdays short names */
moment.updateLocale('zh-tw', {
  weekdaysMin: '一_二_三_四_五_六_日'.split('_'),
});

export default function DateSeat(props) {
  /* Attributes */
  const { groupProp, title } = props;
  /* Data */
  const data = {
    dateFormat: 'MM/DD(dd)',
    seatPrefix: '可售',
    seatPostfix: '位',
  };
  /* Custom style */
  const style = {
    container: {
      marginRight: '5px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dateContainer: { fontSize: '12px', color: '#28b0dc', cursor: 'pointer' },
    seatContainer: { marginTop: '3px' },
    seat: {},
    popup: {
      background: 'gray',
      color: 'white',
      borderRadius: '0',
      fontWeight: '500',
      fontSize: '10px',
      width: '250px',
    },
  };
  /* End of style */

  /* Section rendering for triggering popup */
  const dateSection = (
    <div className="date-container" style={style.dateContainer}>
      {moment(groupProp.date).format(data.dateFormat)}
    </div>
  );

  const availableSeatSection = (
    <div style={style.seatContainer}>
      <button className="seat" style={style.seat}>
        {`${data.seatPrefix}${groupProp.quantity}${data.seatPostfix}`}
      </button>
    </div>
  );

  /* Html rendering */
  return (
    <div className="date-seat-container" style={style.container}>
      <Popup
        on="hover"
        arrow={false}
        contentStyle={style.popup}
        trigger={dateSection}
        position="bottom left"
      >
        {`${title} ${moment(groupProp.date).format()}`}
      </Popup>{' '}
      <Popup
        on="hover"
        arrow={false}
        contentStyle={style.popup}
        trigger={availableSeatSection}
        position="bottom left"
      >
        {`${title} ${moment(groupProp.date).format()}`}
      </Popup>
    </div>
  );
}
