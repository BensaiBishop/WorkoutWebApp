import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function WorkoutFeed () {

    const [workouts, setWorkouts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchWorkouts();
    },[]);

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
                            <h1 className="user-divider m-3 p-3 rounded uppercase bg-zinc-900">{username}</h1>
                            {groupWorkoutsByDateAndUser[date][username].map((workout, index) => (
                                <div key={index} className='m-4 rounded grid grid-cols-5'>
                    
                                    <div className='h-1 w-4 mx-3 my-3 bg-yellow-500 rounded'></div>

                                    <h2 className='hidden uppercase mx-2'>{workout.username}</h2>
                                    <h3 className=" col-span-1 uppercase">{workout.exerciseName}</h3>
                                    <p className=" col-span-1">Weight: {workout.weight} LB</p>
                                    <p className=" col-span-1">Reps: {workout.reps}</p>
                                    <p className=" col-span-1">Sets: {workout.sets}</p>

                                    
                                    <p className="hidden">ID: {workout.id}</p>
                                    <p className="mx-2 hidden">Date: {new Date(workout.postDate).toLocaleDateString()}</p>
                                </div>
                            ))}
                       </div> 
                    ))} 
                </div>
            ))}
        </InfiniteScroll> 
        </div>
    );
}