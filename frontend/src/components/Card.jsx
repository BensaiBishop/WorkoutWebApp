import React, { useState } from 'react';
import IncrementButtons from './IncrementButtons';
import './card.css'

export default function Card ({ index, exercise, handleChange, handleRemove, handleIncrement, handleReset }) {
  return (
    <div className="p-4 mb-4 bg-zinc-700 rounded-lg shadow-md border border-zinc-100">
      <h3 className="font-semibold mb-2 text-xl">Exercise {index + 1}</h3>
      <div className='h-1 bg-zinc-500 my-3'></div>
      <div>Exercise Name</div>
      <input
        type="text"
        name="exerciseName"
        placeholder="Exercise"
        value={exercise.exerciseName || ''}
        onChange={(event) => handleChange(index, event)}
        className="block border rounded mb-3 p-2"
      />

      <div>Weight(lb)</div>
      <input
        type='number'
        name='weight'
        placeholder='Weight (lb)'
        value={exercise.weight}
        onChange={(event) => handleChange(index, event)}
        className="block p-2 border rounded mb-2"
      />
      <div>
        <IncrementButtons 
        index = {index}
        field = "weight"
        handleIncrement = {handleIncrement}
        handleReset = {handleReset}>  
        </IncrementButtons>
      </div>

      <div>Reps</div>
      <input
        type="number"
        name="reps"
        placeholder="Reps"
        value={exercise.reps}
        onChange={(event) => handleChange(index, event)}
        className="block p-2 border rounded mb-2"
      />
      <div>
        <IncrementButtons 
        index = {index}
        field = "reps"
        handleIncrement = {handleIncrement}
        handleReset = {handleReset}>  
        </IncrementButtons>
      </div>

      <div>Sets</div>
      <input
        type="number"
        name="sets"
        placeholder="Sets"
        value={exercise.sets}
        onChange={(event) => handleChange(index, event)}
        className="block p-2 border rounded mb-2"
      />
      <div>
        <IncrementButtons 
        index = {index}
        field = "sets"
        handleIncrement = {handleIncrement}
        handleReset = {handleReset}>  
        </IncrementButtons>
      </div>
      <button
        onClick={() => handleRemove(index)}
        className="p-2 mt-4 bg-red-700 text-white rounded hover:bg-red-900"
      >
        - Remove Exercise
      </button>
    </div>
  );
};

