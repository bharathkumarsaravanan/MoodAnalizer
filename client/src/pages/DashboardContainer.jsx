import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlaylists } from '../slices/Dashboard/playlist';
import { SkeletonLoader } from '../components/skeletonLoader/SkeletonLoader';
import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaBuffer } from 'react-icons/fa';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { playlists=[], status = 'loading', error } = useSelector((state) => state.playlists);
  const { deferredSearch } = useOutletContext();
  const filteredPlaylists = deferredSearch === '' ? playlists : playlists.filter(playlist => {
    return playlist.name.toLowerCase().includes(deferredSearch.toLowerCase())
  })



  useEffect(() => {
    const spotifyUserId = localStorage.getItem('spotify_user_id');
    dispatch(fetchPlaylists(spotifyUserId));
  }, []);
  useEffect(() => {
    console.log("deferredSearch", deferredSearch)
  }, [deferredSearch])
  
  return (
    <div>
        <div className='grid grid-cols-4 gap-4 mx-10'>
          {
            status === 'loading' ?
            Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className='grid grid-cols-[70%_30%] gap-2 border w-90 h-60 border-r-8 border-b-8 border-primary rounded-lg p-4'>
                <div>
                  <div className='w-40 h-40'>
                    <SkeletonLoader />
                  </div>
              <div className="owner mt-5">
                    <p className='text-sm text-secondary w-40 h-4'><SkeletonLoader /></p>
                  </div>
                </div>
                <div>
                  <div className="tracks">
                    <h2 className='text-primary font-bold text-2xl header-font'>Tracks</h2>
                    <p className='text-sm text-secondary text-5xl w-20 h-6'><SkeletonLoader /></p>
                  </div>
                </div>
              </div>
            ))
            :
            filteredPlaylists.length === 0 ?
            <div className="col-span-4 flex flex-col items-center justify-center mt-40">
              <FaBuffer color='#1FD35E' size={100} />
              <div className="text-center text-white text-2xl mt-10">No playlists found</div>
            </div>
            :
            filteredPlaylists.map((playlist) => (
                  <Link key={playlist.id} className='grid grid-cols-[70%_30%] gap-2 border w-90 h-70 border-r-8 border-b-8 cursor-pointer border-primary rounded-lg p-4 hover:border-primary/50 transition-all duration-300'>
                    <div>
                        <img width={200} height={200} src={playlist.images[0].url} alt={playlist.name} />
                        <h3 className='text-white font-semibold mt-2'>{playlist.name}</h3>
                        <p className='text-sm text-secondary'>{playlist.description}</p>
                        <div className="owner mt">
                          <p className='text-sm text-secondary'>{playlist.owner.display_name}</p>
                        </div>
                    </div>
                    <div>
                      <div className="tracks">
                        <h2 className='text-primary font-bold text-2xl header-font'>Tracks</h2>
                        <p className='text-sm text-secondary text-5xl '>{playlist.tracks.total}</p>
                      </div>
                    </div>
                  </Link>
                )) 
              }
        </div>
    </div>
  );
};

export default Dashboard;