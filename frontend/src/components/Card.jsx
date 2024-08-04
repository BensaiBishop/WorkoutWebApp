import React, { useState } from 'react';
import IncrementButtons from './IncrementButtons';

export default function Card ({ index, exercise, handleChange, handleRemove, handleIncrement, handleReset, addExercise }) {
  return (
    <div className="p-4 mb-4 bg-zinc-900 rounded-lg shadow-md border border-zinc-950">

      <div className='flex'> 
        <h3 className="font-semibold my-2 text-xl">Exercise {index + 1}</h3>
        <button
          onClick={() => handleRemove(index)}
          
          className="p-2 px-4 border text-white rounded-2xl hover:bg-red-900 ml-auto mt-0"
        >
          X
        </button>
      </div>
      <div className='h-1 bg-zinc-500 my-3 rounded'></div>
      
      <div className='name'>
        <div>Exercise Name</div>
        <div className='flex'>
          <input
            type="text"
            name="exerciseName"
            placeholder="Exercise"
            value={exercise.exerciseName || ''}
            onChange={(event) => handleChange(index, event)}
            className="block border border-zinc-500 rounded mb-1 p-2"
          />
          <div className='ml-auto'>
            <button className='p-2 bg-yellow-600 rounded w-14 hover:bg-yellow-800 text-zinc-700 font-semibold'
              onClick={() => handleReset(index, "exerciseName")}>
              Clear
            </button>
          </div>
        </div>
      </div>
      <div className='h-1 bg-zinc-500 my-3 rounded'></div>

      <div className='weightbox'>
        <div>Weight (lb)</div>
        <div className='flex'>
          <input
            type='number'
            name='weight'
            placeholder='Weight (lb)'
            value={exercise.weight || ''}
            onChange={(event) => handleChange(index, event)}
            className="block p-2 border border-zinc-500 rounded mb-2"
          />
          <div className='ml-auto'>
            <button className='p-2 bg-yellow-600 rounded w-14 hover:bg-yellow-800 text-zinc-700 font-semibold'
              onClick={() => handleReset(index, "weight")}>
              Clear
            </button>
          </div>
        </div>   
        <div>
          <IncrementButtons 
          index = {index}
          field = "weight"
          handleIncrement = {handleIncrement}
          handleReset = {handleReset}>  
          </IncrementButtons>
        </div>
      </div>
      <div className='h-1 bg-zinc-500 my-3 rounded'></div>

      <div className='repsbox'>
        <div>Reps</div>
        <div className='flex'>
          <input
            type="number"
            name="reps"
            placeholder="Reps"
            value={exercise.reps || ''}
            onChange={(event) => handleChange(index, event)}
            className="block p-2 border border-zinc-500 rounded mb-2"
          />
          <div className='ml-auto'>
            <button className='p-2 bg-yellow-600 rounded w-14 hover:bg-yellow-800 text-zinc-700 font-semibold'
              onClick={() => handleReset(index, "reps")}>
              Clear
            </button>
          </div>
        </div>
        <div>
          <IncrementButtons 
          index = {index}
          field = "reps"
          handleIncrement = {handleIncrement}
          handleReset = {handleReset}>  
          </IncrementButtons>
        </div>
      </div>
      <div className='h-1 bg-zinc-500 my-3 rounded'></div>

      <div className='setbox'>
        <div>Sets</div>
        <div className='flex'>
          <input
            type="number"
            name="sets"
            placeholder="Sets"
            value={exercise.sets || ''}
            onChange={(event) => handleChange(index, event)}
            className="block p-2 border border-zinc-500 rounded mb-2"
          />
          <div className='ml-auto'>
            <button className='p-2 bg-yellow-600 rounded w-14 hover:bg-yellow-800 text-zinc-700 font-semibold'
              onClick={() => handleReset(index, "sets")}>
              Clear
            </button>
          </div>
        </div>
        <div>
          <IncrementButtons 
          index = {index}
          field = "sets"
          handleIncrement = {handleIncrement}
          handleReset = {handleReset}>  
          </IncrementButtons>
        </div>
      </div>
      
      <button
        onClick={() => addExercise()}
        className="p-2 mt-4 mr-2 bg-green-700 text-white rounded hover:bg-green-900"
      >
        + Add Exercise
      </button>

      
      
    </div>
  );
};

