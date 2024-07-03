import React, { useState } from 'react';
import Card from '../components/Card';

const WorkoutsCreation = () => {
  
  const [exercises, setExercises] = useState([{ name: 'Pushups', weight: "100", reps: '30', sets: '3'}]);
  const [username, setUsername] = useState('');


  const addExercise = () => {
    setExercises([...exercises, { name: '', weight: '', reps: '', sets: ''}]);
  };

  const handleChange = (index, event) => {
    const { name, value} = event.target;
    const updatedExercises = [...exercises];
    updatedExercises[index][name] = name === 'name' ? value : parseFloat(value);
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
    const data = {
      currentDate : new Date(),
      username,
      exercises
    };
    try {
      //dev url will redo when deploying to the web server.
      const response = await fetch ('http://localhost:3000/workout',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if(!response.ok){
        throw new Error ('Network response not ok')
      }

      const result = await response.json();
      console.log('Workout submitted: ', result);
      alert('Workout submitted successfully ')

    } catch (error) {
      console.error('Error submitting workout',error);
      alert('Failed to submit workout');
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