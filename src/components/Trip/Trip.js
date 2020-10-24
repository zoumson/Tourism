import React, { useState } from 'react';
import DateSeat from './DateSeat';
import Price from './Price';
import Tag from './Tag';
import './Trip.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
export default function Trip(props) {
  /* Attributes */
  const { trip } = props;
  /* States */
  const [mouseOver, setMouseOver] = useState(false);
  const [mouseLeave, setMouseLeave] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [expanded, setExpanded] = useState(false);

  /* Function handles for scaling the whole trip container */
  const handleMouseOver = (e) => {
    setMouseOver(true);
    setMouseLeave(false);
  };
  const handleMouseLeave = (e) => {
    setMouseOver(false);
    setMouseLeave(true);
  };
  const showMore = () => {
    if (itemsToShow === 3) {
      trip.tags && setItemsToShow(trip.tags.length);
      setExpanded(true);
    } else {
      trip.tags && setItemsToShow(3);
      setExpanded(false);
    }
  };
  /* Data */
  const data = {
    showMoreLabel: '更多日期',
    showLessLabel: '更少日期',
  };
  /* Custom style */
  const style = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      height: '200px',
      width: '60%',
      margin: '2%',
      background: 'white',
    },
    img: { width: '100%', height: '100%' },
    imgContainer: { width: '20%', height: '100%' },
    detailContainer: {
      paddingLeft: '20px',
      paddingTop: '2px',
      width: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    title: {
      display: 'flex',
      height: '40px',
      left: '0',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    tags: { display: 'flex', flexDirection: 'row', height: '100px' },
    dateSeatPriceContainer: {
      padding: '15px',
      paddingLeft: '0px',
      borderTop: 'solid 1px #efefef',
      height: '40px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      bottom: '0',
    },
    date: { display: 'flex', flexDirection: 'row', width: '70%' },
    price: { width: '30%', cursor: 'pointer' },
    popup: {
      background: 'gray',
      color: 'white',
      borderRadius: '0',
      fontWeight: '500',
      fontSize: '10px',
      width: '250px',
    },
    btnShowMore: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      cursor: 'pointer',
      fontSize: '12px',
      color: '#28b0dc',
      fontWeight: 'bold',
    },
  };

  /* Sections in a single trip template display */
  const titlePopup = (
    <div className="title" style={style.title}>
      {trip.title}
    </div>
  );
  const ShowMoreHtml = () => {
    return (
      <div className="btn-show-more-container" style={style.btnShowMore}>
        <div className="btn-show-more" onClick={showMore}>
          {expanded ? (
            <span>{data.showLessLabel}</span>
          ) : (
            <span>{data.showMoreLabel}</span>
          )}
        </div>
      </div>
    );
  };
  const ImageSection = () => {
    return (
      <div className="img-container" style={style.imgContainer}>
        <img
          className={mouseOver ? 'img mouse-over-img' : 'img'}
          style={style.img}
          src={trip.image_url}
          alt=""
        />
      </div>
    );
  };

  const TagsSection = () => {
    return (
      <div className="tags" style={style.tags}>
        {trip.tags &&
          trip.tags.map((tag, tagIndex) => {
            return <Tag key={tagIndex} tag={tag} />;
          })}
      </div>
    );
  };

  const PriceSection = () => {
    return (
      <div className="price" style={style.price}>
        {' '}
        <Price tourDays={trip.tour_days} price={trip.min_price} />{' '}
      </div>
    );
  };
  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className={
        mouseOver ? 'trip-container mouse-over-container' : 'trip-container'
      }
      style={style.container}
    >
      <ImageSection />

      <div className="detail-container" style={style.detailContainer}>
        <Popup
          on="hover"
          arrow={false}
          contentStyle={style.popup}
          trigger={titlePopup}
          position="center"
        >
          {trip.title}
        </Popup>

        <TagsSection />
        <div
          className="date-seat-price-container"
          style={style.dateSeatPriceContainer}
        >
          <div className="date" style={style.date}>
            {trip.group &&
              trip.group.slice(0, itemsToShow).map((groupItem, groupIndex) => {
                return (
                  <DateSeat
                    key={groupIndex}
                    groupProp={groupItem}
                    title={trip.title}
                  />
                );
              })}
            {trip.group.length > itemsToShow ? <ShowMoreHtml /> : <div></div>}
          </div>
          <PriceSection />
        </div>
      </div>
    </div>
  );
}
