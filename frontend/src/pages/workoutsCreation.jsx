import React, { useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';

const WorkoutsCreation = () => {
  
  const [exercises, setExercises] = useState([{ exerciseName: 'Pushups', weight: '100', reps: '30', sets: '3' }]);
  const [username, setUsername] = useState(localStorage.getItem('username') || '');


  const addExercise = () => {
    setExercises([...exercises, { exerciseName: '', weight: '', reps: '', sets: '' }]);
  };

  const handleChange = (index, event) => {
    const {name, value} = event.target;
    const updatedExercises = [...exercises];
    updatedExercises[index][name] = value;
    setExercises(updatedExercises);
  };

  const handleRemove = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  const handleIncrement = (index,field,increment) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = parseFloat(updatedExercises[index][field] || 0) + increment;
    setExercises(updatedExercises);
  };

  const handleReset = (index,field) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = 0;
    setExercises(updatedExercises);
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      alert('User not authenticated, please login'); 
      return;
    }
    const data = {
      postDate : new Date(),
      username,
      exercises,
      token
    };

    try {
      const response = await axios.post('http://localhost:3000/create', data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Workout Submitted:', response.data);
      alert('Workout Submitted Successfully');

    } catch (error) {
      if (error.response) {
        console.log('Error response:',error.response.status, error.response.data);
        alert(`Failed to submit workout: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('Failed to submit workout: No response received from server');
      } else {
        console.error('Error message:', error.message);
        alert(`Failed to submit workout: ${error.message}`);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Create a Workout</h2>

      <button onClick={addExercise} className="my-4 mr-2 p-2 bg-zinc-700 text-white rounded hover:bg-zinc-900 w-40">
        + Add Exercise
      </button>

      <div className='flex flex-wrap gap-4'>
      {exercises.map((exercise, index) => (
        <Card
          key={index}
          index={index}
          exercise={exercise}
          handleChange={handleChange}
          handleRemove={handleRemove}
          handleIncrement={handleIncrement}
          handleReset={handleReset}
        />
      ))}
      </div>

      <button onClick={handleSubmit} className="mt-4 p-2 bg-zinc-700 text-white rounded hover:bg-zinc-900 w-40">
        Submit Workout
      </button>
    </div>
  );
};

export default WorkoutsCreation;