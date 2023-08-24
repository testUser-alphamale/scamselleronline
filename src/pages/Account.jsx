import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../component/Navbar';


const Account = () => {
  const [complainButtonVisible, setComplainButtonVisible] = useState(true);
  const [searchBtnVisible, setSearchBtnVisible] = useState(true)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the current path contains '/complain'
    const isComplainPage = location.pathname.includes('/complain');
    setComplainButtonVisible(!isComplainPage);
    const isSearchPage = location.pathname.includes('/search')
    setSearchBtnVisible(!isSearchPage)
  }, [location]);

  const gotoComplain = () => {
    navigate('/complain');
    setComplainButtonVisible(false);
    setSearchBtnVisible(false) // Hide the button when clicked
  };

  const gotoSearch = () => {
    navigate('/search')
    setSearchBtnVisible(false)
    setComplainButtonVisible(false)
  }


  return (
    <div>

      <Navbar/>
          
      {complainButtonVisible && (
        <button className='border border-black' onClick={gotoComplain}>Complain</button>
        )}
   
      {searchBtnVisible && (
        <button className='border border-black' onClick={gotoSearch}>search</button>
        )}

    </div>
  );
};

export default Account;
