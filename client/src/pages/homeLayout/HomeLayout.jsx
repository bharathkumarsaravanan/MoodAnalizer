import React, { useEffect, useCallback, useDeferredValue, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from '../../assets/global/logo.jpg';
import { FaSearch, FaTable, FaHome, FaSignOutAlt, FaUser, FaBell } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../slices/Header/user';
import { SkeletonLoader } from '../../components/skeletonLoader/SkeletonLoader';

const HomeLayout = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const logout = () => {
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('spotify_refresh_token');
    window.location.href = "https://accounts.spotify.com/en/logout";
  }

  return (
    <div>
      <div className='grid grid-cols-3 items-center justify-between sticky top-0 bg-black'>
        <div className="app-logo">
          <img className='w-20 h-full' width={80} height={80} src={logo} alt="logo" />
        </div>
        <div className="search-bar flex items-center gap-4">
          <Link to="/dashboard" className='cursor-pointer px-2 py-2 rounded-full bg-containerPrimary'><FaHome color='white' size={30} /></Link>
          <div className="custom-search flex items-center w-3/4 justify-around gap-2 bg-containerPrimary rounded-full px-4 py-3 ">
            <div><FaSearch color='#656565' /></div>
            <div className='w-3/4'><input onChange={handleSearch} value={search} type="text" className=' w-full bg-transparent outline-none text-white' placeholder='Search' /></div>
            <div className='cursor-pointer bg-containerPrimary border-l-2 border-gray-500 pl-4'><FaTable color='#656565' size={20} /></div>
          </div>
        </div>
        <ul className='flex gap-6 justify-end items-center pr-10'>
            <li>
                <button className='text-black rounded-full bg-white px-5 py-2 font-bold text-sm' onClick={logout}>Logout</button>
            </li>
            <li>
                <button><FaBell color='#656565' size={20} /></button>
            </li>
            <li>
                <button className='flex min-w-40 h-10 items-center gap-2 text-secondary border-2 border-gray-700 rounded-full px-4 py-2 relative text-sm'>
                  <FaUser color='#656565' size={20} /> {status === 'loading' ? <SkeletonLoader /> : <span>{user.name}</span>}
                </button>
            </li>
        </ul>
      </div>
      <Outlet context={{ deferredSearch }} />
    </div>
  );
};

export default HomeLayout;