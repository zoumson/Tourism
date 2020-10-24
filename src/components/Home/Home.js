import React, { useState } from 'react';
import AllTrips from '../AllTrips/AllTrips';
import Navbar from '../Navbar/Navbar';

export default function Home() {
  /* State */
  const [sortingOption, setSortingOption] = useState(0);
  /* 
0 ----> No sorting
1 ----> Sort from minimum price to maximum price 
2 ----> Sort from maximum  price to minimum price 
*/

  /* Custom styling */
  const style = {
    container: {
      width: '100%',
      height: '100%',
    },
  };
  return (
    <div style={style.container}>
      <div className="navbar-container">
        <Navbar setSortingOption={setSortingOption} />
      </div>
      <div className="all-trip-container">
        <AllTrips sortingOption={sortingOption} />
      </div>
    </div>
  );
}
