import React, { useState, useEffect } from 'react';
import Trip from '../Trip/Trip';

export default function AllTrips(props) {
  /* Attributes */
  const { sortingOption } = props;
  /* States */
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allTripData, setAllTripData] = useState([]);

  /* Function sorting */
  const sortMinMax = (tripData) => {
    tripData.data.tour_list.sort(
      (a, b) => parseInt(a.min_price, 10) - parseInt(b.min_price, 10)
    );
  };
  const sortMaxMin = (tripData) => {
    tripData.data.tour_list.sort(
      (a, b) => parseInt(b.min_price, 10) - parseInt(a.min_price, 10)
    );
  };
  /* API processing */
  useEffect(() => {
    fetch('https://interview.tripresso.com/tour/search')
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          switch (sortingOption) {
            case 0: //Normal display
              break;
            case 1:
              sortMinMax(result); // Sort result from min to max
              break;
            case 2:
              sortMaxMin(result); // Sort result from max to min
              break;
            default:
          }
          setAllTripData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [sortingOption]); // Reload api for any in change for sorting option

  /* Display rendering */
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {allTripData &&
          allTripData['data'] &&
          allTripData['data']['tour_list'].map((tripData, index) => {
            return tripData && <Trip key={index} trip={tripData} />;
          })}
      </div>
    );
  }
}
