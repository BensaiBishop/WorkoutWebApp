import React, { useState } from 'react';
import './card.css'

const Card = ({ index, exercise, handleChange, handleRemove, handleIncrement, handleReset }) => {
  return (
    <div className="p-4 mb-4 bg-zinc-700 rounded-lg shadow-md border border-zinc-100">
      <h3 className="font-semibold mb-2 text-xl">Exercise {index + 1}</h3>
      <div className='h-1 bg-zinc-500 my-3'></div>
      <div>Exercise Name</div>
      <input
        type="text"
        name="name"
        placeholder="Exercise"
        value={exercise.name}
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
      <div className='flex-row space-x-4 py-2 '>
        <button onClick={() => handleIncrement(index, 'weight', 1)} className='card-button'>
          +1
        </button>
        <button onClick={() => handleIncrement(index, 'weight', 5)} className='card-button'>
          +5
        </button>
        <button onClick={() => handleIncrement(index, 'weight', 10)} className='card-button'> 
          +10
        </button>
        <button onClick={() => handleIncrement(index, 'weight', 100)} className='card-button'>
          +100
        </button>
        <button onClick={() => handleReset(index, 'weight')} className='card-button'>
          reset
        </button>
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
      <div className='flex-row space-x-4 py-2'>
        <button onClick={() => handleIncrement(index, 'reps', 1)} className='card-button'>
          +1
        </button>
        <button onClick={() => handleIncrement(index, 'reps', 5)} className='card-button'>
          +5
        </button>
        <button onClick={() => handleIncrement(index, 'reps', 10)} className='card-button'> 
          +10
        </button>
        <button onClick={() => handleIncrement(index, 'reps', 100)} className='card-button'>
          +100
        </button>
        <button onClick={() => handleReset(index, 'reps')} className='card-button'>
          reset
        </button>
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
      <div className='flex-row space-x-4 py-2'>
        <button onClick={() => handleIncrement(index, 'sets', 1)} className='card-button'>
          +1
        </button>
        <button onClick={() => handleIncrement(index, 'sets', 5)} className='card-button'>
          +5
        </button>
        <button onClick={() => handleIncrement(index, 'sets', 10)} className='card-button'> 
          +10
        </button>
        <button onClick={() => handleIncrement(index, 'sets', 100)} className='card-button'>
          +100
        </button>
        <button onClick={() => handleReset(index, 'sets')} className='card-button'>
          reset
        </button>
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

export default Card;