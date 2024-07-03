
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function WorkoutsPage() {

  const navigate = useNavigate();

  const gotoCreateWorkout = () => {
    navigate('/creation');
  }


  return (
    <div className="flex-col">
      <h1 className=" text-4xl m-5">Workouts</h1>
      <h3 className="mx-6">Create or Find a workout</h3>
      
      <button onClick={gotoCreateWorkout} className=' bg-yellow-500 px-10 py-6 rounded-lg font-medium m-5 hover:bg-yellow-700 text-zinc-700 text-2xl'>
         + CREATE
      </button>
      
    </div>
  );
}