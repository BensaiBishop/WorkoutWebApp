
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import WorkoutFeed from '../components/WorkoutFeed';

export default function WorkoutsPage() {

  const navigate = useNavigate();
  const gotoCreateWorkout = () => {
    navigate('/creation');
  }

  return (
    <div className="flex-col justify-items-start">
      <div className='flex'>
        <div>
          <h1 className=" text-4xl m-5">Workouts</h1>
          <h3 className="mx-6">Share your workout!</h3>
        </div>
        <button onClick={gotoCreateWorkout} className=' bg-yellow-500 px-10 py-6 rounded-lg font-medium m-5 hover:bg-yellow-700 text-zinc-700 text-2xl'>
          <h1 className = ''> Create</h1>
        </button>
      </div>
      <div className='h-1 bg-zinc-500'></div>
      <div className='workout-scroll-container' style={{height:'700px', overflow:'auto'}}>
        <WorkoutFeed/>
      </div>
    </div>
  );
};
