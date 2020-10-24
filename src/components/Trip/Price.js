import React from 'react';
import NumberFormat from 'react-number-format';
import './Price.css';
export default function Price(props) {
  /* Attributes */
  const { tourDays, price } = props;
  /* Data */
  const data = {
    currency: '元起',
    numberThousandSeparatorState: true,
    numberDisplayType: 'text',
    day: '天',
  };
  /* Custom styling */
  const style = {
    number: { color: 'orange', fontWeight: '900', fontSize: '25px' },
    letter: { color: 'black', fontWeight: '400', fontSize: '15px' },
    container: { width: '180px', textAlign: 'right' },
  };
  /* Html rendering */
  return (
    <div className="price-container" style={style.container}>
      <span className="day-number" style={style.number}>
        {tourDays}
      </span>
      <span className="day" style={style.letter}>
        {data.day}
      </span>
      <span className="price-number" style={style.number}>
        <NumberFormat
          value={price}
          displayType={data.numberDisplayType}
          thousandSeparator={data.numberThousandSeparatorState}
          prefix={``}
          renderText={(value) => `${value}`}
        />
      </span>
      <span className="currency" style={style.letter}>
        {data.currency}
      </span>
    </div>
  );
}
