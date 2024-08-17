import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react'
import InfiniteScroll from 'react-infinite-scroll-component';

export default function WorkoutFeed ({currentUsername}) {

    const [workouts, setWorkouts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [editingWorkoutId, setEditWorkoutId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    const [editFormData, setEditFormData] = useState({
        exerciseName: '',
        weight: '',
        reps: '',
        sets: '',
    });
    

    useEffect(() => {
        fetchWorkouts();
    },[]);

    const openDeleteModal = (workoutId) => {
        setSelectedWorkout(workoutId);
        setIsDeleteModalOpen(true);
    }

    const openEditModal = (workout) => {
        setEditWorkoutId(workout.id);
        setEditFormData({
          exerciseName: workout.exerciseName,
          weight: workout.weight || '',
          reps: workout.reps || '',
          sets: workout.sets || '',
        });
        setIsEditModalOpen(true);
      };

    const fetchWorkouts = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/workouts?page=${page}&limit=${itemsPerPage}`);
            const fetchWorkouts = response.data.map(workout => ({
                ...workout,
                postDate: new Date(workout.postDate).toLocaleDateString(), 
            }));

            //combine workouts by id to avoid displaying duplicates
            const uniqueWorkouts = [...new Set([...workouts, ...fetchWorkouts].map(workout => workout.id))]
            .map(id => [...workouts, ...fetchWorkouts].find(workout => workout.id === id));
            setWorkouts(uniqueWorkouts);

            //setWorkouts((prevWorkouts) => [...prevWorkouts, ...response.data]);
            if(response.data.length < itemsPerPage) {
                setHasMore(false);
            }
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error('Error fetching workouts:', error);
        }
    };

    const handleEditOnClick = (workout) => {
        console.log('Editing workout:', workout);
        setEditWorkoutId(workout.id);
        setEditFormData({
            exerciseName: workout.exerciseName,
            weight: workout.weight || '',
            reps: workout.reps || '',
            sets: workout.sets || '',
        });
    }; 

    const handleEditSubmit = async (event, workoutId) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.put('http://localhost:3000/api/workouts', {
                token,
                exerciseId: workoutId,
                updates: editFormData,
            });      
            setIsEditModalOpen(false);
            setEditWorkoutId(null);
            window.location.reload();
        } catch (error) {
            console.error('Error editing workout:', error)
        }
    };

    const handleDelete = async (workoutId) => {
        const confirmed = window.confirm("Are you sure you want to delete this workout?");
        if (!confirmed) return;
        const token = localStorage.getItem('token');

        try {
            await axios.delete('http://localhost:3000/api/workouts',{
                data: {token, exerciseId:workoutId}
            });
            setIsDeleteModalOpen(false);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    }

    //gather workouts by date & user to assemble under corresponding date & user
    const groupWorkoutsByDateAndUser = workouts.reduce((acc, workout) => {
        if(!acc[workout.postDate]) {
            acc[workout.postDate] = [];
        }
        if(!acc[workout.postDate][workout.username]) {
            acc[workout.postDate][workout.username] = [];
        }
        acc[workout.postDate][workout.username].push(workout);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupWorkoutsByDateAndUser).sort((a,b) => new Date(b) - new Date(a));

    return (
        <div className="root flex">
            <div className="w-1 ml-auto bg-zinc-500"></div>
            <div className="overflow-auto">
                <InfiniteScroll
                    dataLength={workouts.length}
                    next={fetchWorkouts}
                    hasMore={hasMore}
                    loader={<h1 className="px-5 opacity-5">Loading...</h1>}
                    className="workout-feed"
                >
                    {sortedDates.map((date) => (
                        <div key={date} className="date-group">
                            <div className="date-divider m-2 p-3 rounded bg-zinc-700">{date}</div>
                            {Object.keys(groupWorkoutsByDateAndUser[date]).sort().map((username) => (
                            <div key={username} className="user-group">      
                                    <h1 className="user-divider mx-3 mt-3 p-3 rounded uppercase bg-slate-500 font-bold">{username}</h1>
                                    {groupWorkoutsByDateAndUser[date][username].map((workout, index) => (
                                        <div key={index} className=' mx-4 my-1 rounded pt-0.5 grid grid-cols-6 bg-zinc-900 overflow-hidden'>
                                            <>
                                                <div className='h-1 w-4 ml-3 my-3 bg-yellow-500 rounded'></div>
                                                
                                                <div className=" col-span-1 overflow-hidden mr-5">
                                                    <h3 className="uppercase">{workout.exerciseName}</h3>
                                                </div>

                                                <div className=" col-span-1 overflow-hidden mr-5">
                                                    {workout.weight != null && workout.weight !== 0 && (
                                                        <p>Wt: {workout.weight} LB</p> 
                                                    )}
                                                </div>
                                                
                                                <div className=" col-span-1 overflow-hidden mr-5">
                                                    {workout.reps != null && workout.reps !== 0 && (
                                                        <p>Reps: {workout.reps}</p> 
                                                    )}
                                                </div>
                                                <div className=" col-span-1 overflow-hidden mr-5">
                                                    {workout.sets != null && workout.sets !== 0 && (
                                                        <p>Sets: {workout.sets}</p> 
                                                    )}
                                                </div>

                                                <p className="hidden">ID: {workout.id}</p>

                                                {workout.username === currentUsername && (
                                                    <div className="flex col-span-1 overflow-hidden">
                                                        <div className="px-4 mx-2 rounded opacity-15  hover:opacity-100">
                                                            <button onClick={() => openEditModal(workout)}>
                                                                Edit
                                                            </button>
                                                        </div>
                                                        <div className="px-4 mx-2 rounded opacity-15 hover:opacity-100">
                                                            <button onClick={() => openDeleteModal(workout.id)} className="">
                                                                Del
                                                            </button>
                                                        </div> 
                                                    </div>   
                                                )}                                             
                                                <p className="mx-2 hidden">Date: {new Date(workout.postDate).toLocaleDateString()}</p>
                                            </>
                                        </div>
                                    ))}
                                    <div className="h-1 mx-3 mt-1.5 rounded bg-zinc-700"></div>
                            </div> 
                            ))}                    
                        </div>
                    ))}
                </InfiniteScroll> 

                {/* Edit Workout Modal */}
                <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="bg-zinc-800 rounded shadow-lg p-6 w-1/3">
                        <DialogTitle className="text-lg font-bold pb-3">Edit Workout</DialogTitle>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={editFormData.exerciseName}
                            onChange={(e) => setEditFormData({ ...editFormData, exerciseName: e.target.value })}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Exercise Name"
                        />
                        <input
                            type="number"
                            value={editFormData.weight}
                            onChange={(e) => setEditFormData({ ...editFormData, weight: e.target.value })}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Weight"
                        />
                        <input
                            type="number"
                            value={editFormData.reps}
                            onChange={(e) => setEditFormData({ ...editFormData, reps: e.target.value })}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Reps"
                        />
                        <input
                            type="number"
                            value={editFormData.sets}
                            onChange={(e) => setEditFormData({ ...editFormData, sets: e.target.value })}
                            className="w-full px-4 py-2 border rounded"
                            placeholder="Sets"
                        />
                        <div className="flex justify-end space-x-4">
                            <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                                Cancel
                            </button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                Confirm
                            </button>
                        </div>
                        </form>
                    </DialogPanel>
                    </div>
                </Dialog>

                {/* Delete Confirmation Modal */}
                <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="bg-zinc-800 rounded shadow-lg p-6 w-1/3">
                        <DialogTitle className="text-lg font-bold">Delete Workout</DialogTitle>
                        <Description className="mt-2">
                            Are you sure you want to delete this workout? This action cannot be undone.
                        </Description>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button onClick={() => setIsDeleteModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                                Cancel
                            </button>
                            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                                Delete
                            </button>
                        </div>
                    </DialogPanel>
                    </div>
                </Dialog>

            </div>
        </div>
    );
}